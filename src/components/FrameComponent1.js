import React, { useState } from "react";
import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "", onTabClick }) => {
  const [activeTab, setActiveTab] = useState("台球");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabClick(tab);
  };

  return (
    <header
      className={`self-stretch bg-background-default-default box-border flex flex-row items-center justify-center pt-2 pb-2 pr-[13px] pl-[38px] top-[0] z-[99] sticky max-w-full gap-[20px] text-left text-base text-black-100 font-body-base border-b-[1px] border-solid border-gray-200 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <div className="relative flex items-center justify-center w-[320px] h-[40px] border-[1px] border-solid border-black-100 rounded-radius-200">
          <div
            className={`absolute top-0 bottom-0 left-0 w-[50%] bg-black-100 rounded-radius-200 transition-transform duration-300 ease-in-out ${activeTab === "台球" ? "translate-x-0" : "translate-x-full"}`}
          />
          <div className="relative z-10 flex items-center justify-center w-[50%]">
            <button
              onClick={() => handleTabClick("台球")}
              className={`cursor-pointer ${activeTab === "台球" ? "text-white" : "text-black-100"} text-lg bg-transparent border-none`}
              style={{ padding: "0 20px" }}
            >
              台球
            </button>
          </div>
          <div className="relative z-10 flex items-center justify-center w-[50%]">
            <button
              onClick={() => handleTabClick("商品")}
              className={`cursor-pointer ${activeTab === "商品" ? "text-white" : "text-black-100"} text-lg bg-transparent border-none`}
              style={{ padding: "0 20px" }}
            >
              商品
            </button>
          </div>
        </div>
      </div>
      <div className="w-[139px] flex flex-row items-start justify-start gap-[12px] text-text-default-secondary mq450:w-[52px] absolute right-0 top-0 mt-2 mr-[13px]">
        <img
          className="h-icon-large w-icon-large relative rounded-radius-full overflow-hidden shrink-0 object-contain z-[2]"
          loading="lazy"
          alt=""
          src="/avatar@2x.png"
        />
        <div className="flex-1 flex flex-col items-start justify-start gap-[2px] mq450:hidden">
          <div className="self-stretch relative leading-[140%] font-semibold z-[2]">
            值班员工
          </div>
          <div className="self-stretch relative leading-[140%] text-text-default-tertiary z-[2]">
            值班时长
          </div>
        </div>
      </div>
    </header>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
  onTabClick: PropTypes.func.isRequired,
};

export default FrameComponent1;
