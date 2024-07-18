import React, { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar"; // 导入侧栏组件
import PriceSettingDialog from "./PriceSettingDialog"; // 导入价格设置对话框

const Profile = ({ className = "", onTabClick }) => {
  const [activeTab, setActiveTab] = useState("台球");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPriceSetting, setShowPriceSetting] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabClick(tab);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePriceSettingClick = () => {
    setShowPriceSetting(true);
  };

  return (
    <>
      <header
        className={`self-stretch bg-background-default-default box-border flex flex-row items-center justify-between pt-3 pb-2.5 pr-[13px] pl-[38px] top-[0] z-[99] sticky max-w-full gap-[20px] text-left text-base text-text-neutral-default font-body-base border-b-[1px] border-solid border-gray-200 ${className}`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          onPriceSettingClick={handlePriceSettingClick}
        />
        <div className="flex items-center justify-start">
          <button onClick={toggleSidebar} className="cursor-pointer bg-transparent">
            <img
              className="w-10 h-10 relative overflow-hidden shrink-0 z-[2]"
              loading="lazy"
              alt=""
              src="/settings.svg"
            />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="relative flex items-center justify-center w-[600px] h-[40px] border-[1px] border-solid border-black-100 rounded-radius-200">
            <div
              className={`absolute top-0 bottom-0 left-0 w-[20%] bg-black-100 rounded-radius-200 transition-transform duration-300 ease-in-out ${
                activeTab === "商品"
                  ? "translate-x-0"
                  : activeTab === "会员管理"
                  ? "translate-x-full"
                  : activeTab === "员工管理"
                  ? "translate-x-[200%]"
                  : activeTab === "订单管理"
                  ? "translate-x-[300%]"
                  : "translate-x-[400%]"
              }`}
            />
            {["商品", "会员管理", "员工管理", "订单管理", "台球"].map((tab) => (
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
        <div className="w-[139px] flex flex-row items-start justify-start gap-[12px] text-text-default-secondary mq1050:w-[52px]">
          <img
            className="h-icon-large w-icon-large relative rounded-radius-full overflow-hidden shrink-0 object-cover z-[2]"
            loading="lazy"
            alt=""
            src="/avatar@2x.png"
          />
          <div className="flex-1 flex flex-col items-start justify-start gap-[2px] mq1050:hidden">
            <div className="self-stretch relative leading-[140%] font-semibold z-[2]">
              值班员工
            </div>
            <div className="self-stretch relative leading-[140%] text-text-default-tertiary z-[2]">
              值班时长
            </div>
          </div>
        </div>
      </header>
      <PriceSettingDialog
        isOpen={showPriceSetting}
        onClose={() => setShowPriceSetting(false)}
        onSave={(prices) => console.log("Saved prices:", prices)}
      />
    </>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  onTabClick: PropTypes.func.isRequired,
};

export default Profile;
