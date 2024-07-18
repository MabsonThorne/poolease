import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSwipeable } from "react-swipeable";

const TableSelection = ({ className = "", headerSeparator, onTableClick }) => {
  const [selected, setSelected] = useState(null);
  const [tables, setTables] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const buttonsPerPage = 12;

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/pool-tables");
        setTables(response.data.filter(table => table.interface));
      } catch (error) {
        console.error("Error fetching pool tables:", error);
      }
    };
    fetchTables();

    const interval = setInterval(fetchTables, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (tableName) => {
    const newSelected = selected === tableName ? null : tableName;
    setSelected(newSelected);
    onTableClick(newSelected);
  };

  const handleSwipe = (direction) => {
    if (direction === "LEFT" && currentPage < Math.ceil(tables.length / buttonsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "RIGHT" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i < tables.length; i++) {
      buttons.push(
        <div
          key={tables[i].id}
          style={{
            width: "115px",
            height: "115px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "2px solid black",
            backgroundColor: tables[i].status === 1 ? "red" : (selected === tables[i].name ? "black" : "transparent"),
            color: tables[i].status === 1 ? "white" : (selected === tables[i].name ? "white" : "black"),
            margin: "5px",
          }}
          onClick={() => handleSelect(tables[i].name)}
        >
          {tables[i].name}
        </div>
      );
    }

    while (buttons.length % buttonsPerPage !== 0) {
      buttons.push(
        <div
          key={`empty-${buttons.length}`}
          style={{
            width: "115px",
            height: "115px",
            borderRadius: "10px",
            border: "2px solid transparent",
            margin: "5px",
          }}
        />
      );
    }
    return buttons;
  };

  const paginatedButtons = () => {
    const buttons = renderButtons();
    const pages = [];
    for (let i = 0; i < buttons.length; i += buttonsPerPage) {
      pages.push(buttons.slice(i, i + buttonsPerPage));
    }
    return pages;
  };

  const pages = paginatedButtons();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className={`w-full h-full mb-4 rounded-xl bg-background-default-default flex flex-col items-center justify-start pt-8 px-4 pb-8 box-border gap-4 max-w-full z-[1] text-left text-13xl text-black-100 font-body-base lg:pt-4 lg:pb-4 lg:box-border ${className}`} {...swipeHandlers}>
      <div className="w-full h-full relative rounded-xl bg-background-default-default hidden max-w-full" />
      <div className="self-stretch flex flex-col items-center justify-start gap-4 max-w-full">
        <div className="self-stretch flex flex-col items-center justify-start gap-2 max-w-full">
          <div className="w-full flex flex-row items-center justify-center py-0 px-2 box-border max-w-full">
            <div className="flex-1 relative leading-[58.8px] inline-block z-[2] text-3xl">
              <span>请选择台号</span>
              <span className="text-xl">（左滑选择更多）</span>
            </div>
          </div>
          <img
            className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain mt-[-15px] z-[2]"
            alt=""
            src={headerSeparator}
          />
        </div>
        <div className="w-full flex overflow-hidden relative justify-center flex-1 items-center">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)`, width: '100%' }}
          >
            {pages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="grid grid-cols-3 grid-rows-4 gap-2 box-border p-2 min-w-full"
                style={{ display: 'grid', placeItems: 'center' }}
              >
                {page}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center w-full mt-2">
          {pages.map((_, pageIndex) => (
            <div
              key={pageIndex}
              className={`w-3 h-3 rounded-full mx-1 ${currentPage === pageIndex ? "bg-black" : "bg-gray-300"}`}
              onClick={() => setCurrentPage(pageIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

TableSelection.propTypes = {
  className: PropTypes.string,
  headerSeparator: PropTypes.string,
  onTableClick: PropTypes.func.isRequired,
};

export default TableSelection;
