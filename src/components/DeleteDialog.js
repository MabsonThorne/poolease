// src/components/DeleteDialog.js

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const DeleteDialog = ({ isOpen, onClose, onConfirm }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="删除确认"
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-96 z-50"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">确认删除</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-black">
        ×
      </button>
    </div>
    <p>你确定要删除这个商品吗？</p>
    <div className="flex justify-end gap-4 mt-4">
      <button onClick={onClose} className="px-4 py-2 border border-black rounded text-black">取消</button>
      <button onClick={onConfirm} className="px-4 py-2 bg-black text-white rounded">确认</button>
    </div>
  </Modal>
);

DeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteDialog;
