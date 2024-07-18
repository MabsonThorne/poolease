import React, { useState } from "react";
import PropTypes from "prop-types";

const PriceSettingDialog = ({ isOpen, onClose, onSave }) => {
  const [prices, setPrices] = useState({ day: 18, night: 20 });

  const handleSave = () => {
    onSave(prices);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <button onClick={onClose} className="absolute top-2 right-2">
            X
          </button>
          <div>
            <label>
              白天价格:
              <input
                type="number"
                value={prices.day}
                onChange={(e) => setPrices({ ...prices, day: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              夜间价格:
              <input
                type="number"
                value={prices.night}
                onChange={(e) => setPrices({ ...prices, night: e.target.value })}
              />
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="border border-black py-2 px-4 rounded-lg">
              取消
            </button>
            <button onClick={handleSave} className="bg-black text-white py-2 px-4 rounded-lg">
              保存
            </button>
          </div>
        </div>
      </div>
    )
  );
};

PriceSettingDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PriceSettingDialog;
