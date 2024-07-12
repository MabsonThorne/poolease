import React, { useState } from "react";
import OrderItems from "./OrderItems";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";

const ProductCarousel = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState("饮料");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const totalItems = 30; // 假设有30个物品

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
        <OrderItems
          key={i}
          name={`商品名${i}`}
          price={`价格${i}`}
          quantity={i}
          stock={100 - i} // 示例库存
          className="w-[160px] h-[200px] rounded-3xs shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
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
      className={`w-full h-full rounded-xl bg-background-default-default flex flex-col items-center justify-start pt-12 pb-[94px] pr-[38px] pl-10 box-border gap-[52.5px] max-w-full z-[1] text-left text-13xl text-black-100 font-body-base ${className}`}
      {...swipeHandlers}
    >
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full">
        <div className="flex-1 flex flex-col items-start justify-start gap-[12px] max-w-full">
          <div className="w-full flex flex-row items-start justify-between py-0 px-2 box-border max-w-full">
            <div className="h-[39px] flex-1 relative leading-[39.2px] inline-block z-[2]">
              <span>请选择商品</span>
              <span className="text-xl">（左滑选择更多）</span>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative flex items-center justify-center w-[600px] h-[40px] border-[1px] border-solid border-black-100 rounded-radius-200">
                <div
                  className={`absolute top-0 bottom-0 left-0 w-[20%] bg-black-100 rounded-radius-200 transition-transform duration-300 ease-in-out ${
                    activeTab === "饮料"
                      ? "translate-x-0"
                      : activeTab === "零食"
                      ? "translate-x-full"
                      : activeTab === "香烟"
                      ? "translate-x-[200%]"
                      : activeTab === "纸巾"
                      ? "translate-x-[300%]"
                      : "translate-x-[400%]"
                  }`}
                />
                {["饮料", "零食", "香烟", "纸巾", "其他"].map((tab) => (
                  <div
                    key={tab}
                    className="relative z-10 flex items-center justify-center w-[20%]"
                  >
                    <button
                      onClick={() => handleTabClick(tab)}
                      className={`cursor-pointer ${
                        activeTab === tab ? "text-white" : "text-black-100"
                      } text-lg bg-transparent border-none`}
                      style={{ width: "100%", height: "100%" }}
                    >
                      {tab}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <img
            className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain mt-[-1px] z-[2]"
            alt=""
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center overflow-hidden relative mt-[-40px]" {...swipeHandlers}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)`, width: '100%' }}
        >
          {pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="grid grid-cols-5 grid-rows-2 gap-4 gap-y-12 box-border p-4 min-w-full" // 调整行距和列距
              style={{ display: 'grid', placeItems: 'center' }}
            >
              {page}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center w-full mt-[-30px]"> {/* 调整页面提示的距离 */}
        {pages.map((_, pageIndex) => (
          <div
            key={pageIndex}
            className={`w-3 h-3 rounded-full mx-1 ${currentPage === pageIndex ? "bg-black" : "bg-gray-300"}`}
            onClick={() => setCurrentPage(pageIndex)}
          />
        ))}
      </div>
      <div className="self-stretch flex flex-col items-center justify-center mt-[-25px]"> {/* 调整结账按钮的距离 */}
        <button className="w-full max-w-[200px] bg-black-100 text-background-default-default py-4 rounded-3xs hover:bg-gray-700">
          结账
        </button>
      </div>
    </div>
  );
};

ProductCarousel.propTypes = {
  className: PropTypes.string,
};

export default ProductCarousel;
