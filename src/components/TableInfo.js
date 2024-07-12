import React, { useState } from "react";
import PropTypes from "prop-types";
import ItemOne from "./ItemOne";
import { useSwipeable } from "react-swipeable";

const TableInfo = ({ className = "", showMinusButton = false }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalItems = 20;

  const handleSwipe = (direction) => {
    if (direction === "LEFT" && currentPage < Math.ceil(totalItems / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "RIGHT" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const renderItems = () => {
    const items = [];
    for (let i = 1; i <= totalItems; i++) {
      items.push(
        <ItemOne
          key={i}
          className="w-[140px] h-[120px] rounded-3xs shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
          propWidth="120px"
          quantity={i}
          showMinusButton={showMinusButton}
        />
      );
    }
    return items;
  };

  const paginatedItems = () => {
    const items = renderItems();
    const pages = [];
    for (let i = 0; i < items.length; i += itemsPerPage) {
      pages.push(items.slice(i, i + itemsPerPage));
    }
    return pages;
  };

  const pages = paginatedItems();

  return (
    <div
      className={`flex-1 rounded-xl bg-background-default-default flex flex-col items-start justify-start py-[10px] pr-[20px] pl-[20px] box-border gap-[10px] min-w-[442px] max-w-full z-[1] text-left text-13xl text-black-100 font-body-base lg:pt-[10px] lg:pb-[10px] lg:box-border ${className}`}
      {...swipeHandlers}
    >
      <div className="w-full h-full relative rounded-xl bg-background-default-default hidden max-w-full" />
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-1 box-border max-w-full">
        <div className="flex-1 flex flex-col items-start justify-start gap-[10px] max-w-full lg:flex-1">
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-1.5 box-border gap-[10px] max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[10px] max-w-full">
              <div className="self-stretch flex flex-row items-end justify-start gap-[10px] max-w-full flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-start gap-[5.4px] min-w-[292px] max-w-full">
                  <div className="w-[335px] flex flex-row items-start justify-start gap-[37px] shrink-0 max-w-full flex-wrap gap-[18px]">
                    <a className="[text-decoration:none] flex-1 relative text-[inherit] inline-block min-w-[104px] z-[2] text-lgi text-7xl">
                      <span className="text-inherit">开台时间：</span>
                    </a>
                    <a className="[text-decoration:none] relative text-red-200 whitespace-nowrap z-[2] text-lgi text-7xl">
                      00:00:00
                    </a>
                  </div>
                  <img
                    className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain shrink-0 mt-[-1px] z-[2]"
                    loading="lazy"
                    alt=""
                    src="/line-2.svg"
                  />
                </div>
                <div className="flex flex-col items-start justify-end pt-0 px-0 pb-px">
                  <button className="cursor-pointer [border:none] py-3 px-[9px] bg-red-200 rounded-3xs flex flex-row items-start justify-start z-[2] hover:bg-red-100">
                    <div className="h-[42px] w-[108px] relative rounded-3xs bg-red-200 hidden" />
                    <a className="[text-decoration:none] relative text-mini font-body-base text-background-default-default text-left inline-block min-w-[90px] z-[3]">
                      点击停止计费
                    </a>
                  </button>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[10px]">
                <h1 className="m-0 w-24 relative text-inherit font-normal font-inherit inline-block z-[2] text-lgi text-7xl">
                  <span className="text-inherit">台费：</span>
                </h1>
                <div className="relative text-red-200 inline-block min-w-[120px] z-[2] text-lgi text-7xl">
                  ￥00.00
                </div>
              </div>
            </div>
            <img
              className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain mt-[-1px] z-[2]"
              loading="lazy"
              alt=""
              src="/line-3.svg"
            />
          </div>
          <div className="self-stretch flex flex-row items-start justify-between pt-0 px-0 pb-1.5 gap-[10px] flex-wrap">
            <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
              <h1 className="m-0 relative text-inherit font-normal font-inherit inline-block min-w-[128px] z-[2] text-lgi text-7xl">
                <span className="text-inherit">已选商品</span>
              </h1>
            </div>
            <div className="rounded-3xs bg-black-100 flex flex-row items-start justify-start pt-[9px] pb-2.5 pr-[7px] pl-[9px] gap-[9px] z-[2] text-mini text-background-default-default cursor-pointer" onClick={() => console.log("添加商品")}>
              <div className="h-[42px] w-[108px] relative rounded-3xs bg-black-100 hidden" />
              <img
                className="h-[23px] w-[23px] relative overflow-hidden shrink-0 min-h-[23px] z-[3]"
                loading="lazy"
                alt=""
                src="/plus-circle.svg"
              />
              <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                <div className="relative inline-block min-w-[60px] z-[3]">
                  添加商品
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex overflow-hidden relative" {...swipeHandlers}>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {pages.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className="grid grid-cols-3 grid-rows-2 gap-x-8 gap-y-8 min-w-full box-border p-4"
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
      <div className="self-stretch flex flex-col items-start justify-start gap-[10px] max-w-full">
        <div className="flex flex-row items-start justify-start py-0 px-1">
          <div className="flex flex-row items-start justify-start gap-[10px]">
            <h1 className="m-0 w-24 relative text-inherit font-normal font-inherit inline-block z-[2] text-lgi text-7xl">
              <span className="text-inherit">共计：</span>
            </h1>
            <div className="relative text-red-200 inline-block min-w-[120px] z-[2] text-lgi text-7xl">
              ￥00.00
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-3xs bg-black-100 flex flex-row items-start justify-center pt-[9px] px-5 pb-2.5 box-border max-w-full z-[2] text-background-default-default cursor-pointer" onClick={() => console.log("结账")}>
          <div className="h-[58px] w-[564px] relative rounded-3xs bg-black-100 hidden max-w-full" />
          <h1 className="m-0 relative text-inherit font-normal font-inherit inline-block min-w-[64px] z-[3] text-lgi text-7xl">
            <span className="text-inherit">结账</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

TableInfo.propTypes = {
  className: PropTypes.string,
  showMinusButton: PropTypes.bool,
};

export default TableInfo;
