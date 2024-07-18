import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

const TableSelection1 = ({ className = "", headerSeparator, onTableClick, onAddTableClick }) => {
  const [selected, setSelected] = useState(null);
  const [tables, setTables] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const buttonsPerPage = 12;

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/pool-tables");
        const filteredTables = response.data.filter(table => table.interface).map(table => ({
          name: table.name,
          status: table.status,
        }));
        setTables(filteredTables);
      } catch (error) {
        console.error("Error fetching pool tables:", error);
      }
    };

    fetchTables();
    const intervalId = setInterval(fetchTables, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSelect = (tableName) => {
    const selectedTable = tables.find(table => table.name === tableName);
    const tableId = selectedTable ? selectedTable.name : null; // Use name as tableId for now
    const newSelected = selected === tableId ? null : tableId; // Toggle selection
    setSelected(newSelected);
    onTableClick(newSelected); // Pass tableId
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
          key={tables[i].name}
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
          onClick={() => handleSelect(tables[i].name)} // Pass table name to handleSelect
        >
          {tables[i].name}
        </div>
      );
    }

    buttons.push(
      <div
        key="add-button"
        style={{
          width: "115px",
          height: "115px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "2px solid black",
          backgroundColor: "transparent",
          color: "black",
          margin: "5px",
        }}
        onClick={onAddTableClick}
      >
        +
      </div>
    );

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

  return (
    <div className={`w-full h-full mb-4 rounded-xl bg-background-default-default flex flex-col items-center justify-start pt-8 px-4 pb-8 box-border gap-4 max-w-full z-[1] text-left text-13xl text-black-100 font-body-base ${className}`}>
      <div className="w-full h-full relative rounded-xl bg-background-default-default hidden max-w-full" />
      <div className="self-stretch flex flex-col items-center justify-start gap-4 max-w-full">
        <div className="self-stretch flex flex-col items-center justify-start gap-2 max-w-full">
          <div className="w-full flex flex-row items-center justify-center py-0 px-2 box-border max-w-full">
            <div className="flex-1 relative leading-[58.8px] inline-block z-[2] text-3xl">
              <span>请选择台号</span>
            </div>
          </div>
          <img className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain mt-[-15px] z-[2]" alt="" src={headerSeparator} />
        </div>
        <div className="w-full flex overflow-hidden relative justify-center flex-1 items-center">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentPage * 100}%)`, width: '100%' }}>
            {pages.map((page, pageIndex) => (
              <div key={pageIndex} className="grid grid-cols-3 grid-rows-4 gap-2 box-border p-2 min-w-full" style={{ display: 'grid', placeItems: 'center' }}>
                {page}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center w-full mt-[-10px]">
          <button className={`rounded-radius-200 flex flex-row items-center justify-center py-[8px] px-[12px] gap-[8px] opacity-[0.5] text-text-default-secondary ${currentPage === 0 ? "disabled" : ""}`} onClick={() => handleSwipe("RIGHT")} disabled={currentPage === 0}>
            <img className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px]" loading="lazy" alt="" src="arrow-left.svg" />
            <div className="relative leading-[100%] inline-block min-w-[48px]">上一页</div>
          </button>
          <div className="flex-1 flex flex-row items-center justify-center gap-[8px] min-w-[270px]">
            {[...Array(pages.length).keys()].map((page) => (
              <div key={page} className={`rounded-radius-200 flex flex-col items-center justify-center py-[8px] px-[12px] ${currentPage === page ? "bg-background-brand-default text-text-brand-on-brand" : ""}`}>
                <div className="relative leading-[100%] inline-block min-w-[8px] cursor-pointer" onClick={() => setCurrentPage(page)}>
                  {page + 1}
                </div>
              </div>
            ))}
          </div>
          <button className={`rounded-radius-200 flex flex-row items-center justify-center py-[8px] px-[12px] gap-[8px] ${currentPage === pages.length - 1 ? "disabled" : ""}`} onClick={() => handleSwipe("LEFT")} disabled={currentPage === pages.length - 1}>
            <div className="relative leading-[100%] inline-block min-w-[48px]">下一页</div>
            <img className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px]" loading="lazy" alt="" src="arrow-right.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

TableSelection1.propTypes = {
  className: PropTypes.string,
  headerSeparator: PropTypes.string,
  onTableClick: PropTypes.func.isRequired,
  onAddTableClick: PropTypes.func.isRequired,
};

export default TableSelection1;
