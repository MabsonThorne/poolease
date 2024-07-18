import React from "react";
import PropTypes from "prop-types";

const Sidebar = ({ isOpen, onClose, onPriceSettingClick }) => {
  const handleOptionClick = (option) => {
    if (option === "价格设置") {
      onClose();
      onPriceSettingClick();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`}
      style={{ width: "250px" }}
    >
      <div className="p-4 relative h-full flex flex-col justify-between">
        <div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-transparent border-none"
          >
            <img
              src="/arrow-right.svg"
              alt="关闭"
              className="w-6 h-6 cursor-pointer"
              style={{ backgroundColor: 'transparent' }}
            />
          </button>
          <div className="mt-16">
            {["价格设置", "支付接口设置", "接口设置"].map((option) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className="flex items-center text-black-100 text-lg w-full text-left p-4 border-b border-gray-200 cursor-pointer transition-colors duration-200 hover:bg-gray-200"
              >
                <div className="w-1 h-full bg-transparent transition-colors duration-200 hover:bg-black"></div>
                <span className="ml-2">{option}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <button
            onClick={() => console.log("Logout")}
            className="text-black-100 text-lg w-full text-left p-4 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
          >
            登出
          </button>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPriceSettingClick: PropTypes.func.isRequired,
};

export default Sidebar;
