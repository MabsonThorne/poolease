import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const ScanQRCodeDialog = ({ isOpen, onClose, onScanComplete }) => {
  const [scanComplete, setScanComplete] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isOpen) {
      inputRef.current.focus();

      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          const qrCode = inputRef.current.value;
          setScanComplete(true);
          onScanComplete(qrCode);
          inputRef.current.value = ''; // 清空输入框
          clearTimeout(timer); // 取消定时器
        }
      };

      const inputElement = inputRef.current;
      inputElement.addEventListener('keypress', handleKeyPress);

      // 设置5分钟定时器
      timer = setTimeout(() => {
        onClose();
      }, 5 * 60 * 1000); // 5分钟

      return () => {
        inputElement.removeEventListener('keypress', handleKeyPress);
        clearTimeout(timer); // 清理定时器
      };
    }
  }, [isOpen, onScanComplete, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        {scanComplete ? (
          <h1 className="text-2xl mb-4">订单已完成</h1>
        ) : (
          <h1 className="text-2xl mb-4">请将二维码对准扫码器</h1>
        )}
        {scanComplete && (
          <div className="mt-4">
            <button onClick={onClose} className="bg-black text-white py-2 px-4 rounded">
              关闭
            </button>
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          className="absolute opacity-0"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

ScanQRCodeDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onScanComplete: PropTypes.func.isRequired,
};

export default ScanQRCodeDialog;
