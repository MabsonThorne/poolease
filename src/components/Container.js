import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from 'axios';
import Modal from 'react-modal';

const Container = ({ className = "", onProductSelect }) => {
  const [activeTab, setActiveTab] = useState("饮料");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://locolhost:5002/api/products');
      const filteredProducts = response.data.filter(product => product.category === activeTab);
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < Math.ceil(products.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRowClick = (product) => {
    setSelectedProductId(product.id);
    onProductSelect(product);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5002/api/products/${productToDelete.id}`);
      fetchProducts();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const renderTableRows = () => {
    const rows = [];
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = products.slice(startIndex, endIndex);

    currentItems.forEach((product) => {
      rows.push(
        <tr
          key={product.id}
          className={`border-b border-gray-200 ${selectedProductId === product.id ? 'border-black' : ''}`}
          onClick={() => handleRowClick(product)}
        >
          <td className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">{product.name}</td>
          <td className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center text-lightslategray-200">{product.price}</td>
          <td className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">{product.quantity}</td>
          <td className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center text-lightslategray-200">{product.cost_price}</td>
          <td className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">
            <img
              className="h-6 w-6 mx-auto cursor-pointer"
              loading="lazy"
              alt="删除"
              src="/trash-2.svg"
              onClick={(e) => { e.stopPropagation(); handleDeleteClick(product); }}
            />
          </td>
        </tr>
      );
    });

    while (rows.length % itemsPerPage !== 0) {
      rows.push(
        <tr key={`empty-${rows.length}`} className="border-b border-gray-200">
          <td className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">&nbsp;</td>
          <td className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">&nbsp;</td>
          <td className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">&nbsp;</td>
          <td className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">&nbsp;</td>
          <td className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">&nbsp;</td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <div className={`w-[600px] h-full rounded-xl bg-background-default-default flex flex-col items-end justify-start pt-4 px-4 pb-4 box-border gap-4 max-w-full z-[2] text-left text-base text-gray-200 font-body-base ${className}`}>
      <div className="w-full flex flex-row items-start justify-start gap-4 max-w-full text-13xl">
        <div className="flex-1 rounded-3xs bg-background-default-default box-border flex flex-row items-center justify-between py-2.5 px-4 min-w-[150px] max-w-full z-[3] border-[1px] border-solid border-black-100">
          <input type="text" className="w-full h-full bg-background-default-default border-none focus:outline-none" placeholder="请输入商品名" />
        </div>
        <button className="h-full cursor-pointer py-2.5 pr-10 pl-8 bg-background-brand-default rounded-radius-200 overflow-hidden flex flex-row items-center justify-start gap-[8px] z-[3] border-[1px] border-solid border-background-brand-default">
          <div className="relative text-base leading-[100%] font-body-base text-text-brand-on-brand text-left">
            搜索
          </div>
        </button>
      </div>
      <div className="w-full flex items-center justify-center py-4">
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
            <div key={tab} className="relative z-10 flex items-center justify-center w-[20%]">
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
      <div className="w-full flex flex-col items-start justify-start gap-4 max-w-full shrink-0 text-darkslategray font-rubik mt-[-20px]">
        <table className="self-stretch table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">名称</th>
              <th className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">价格</th>
              <th className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">数量</th>
              <th className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">进价</th>
              <th className="border border-gray-200 p-2 w-[20%] h-[40px] text-lg leading-[39.2px] text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-[30px] box-border max-w-full text-text-default-default mt-2">
        <div className="w-full flex flex-row items-center justify-between gap-[8px] max-w-full z-[3]">
          <button
            className="rounded-radius-200 flex flex-row items-center justify-center py-space-200 px-space-300 gap-[8px] opacity-[0.5] text-text-default-secondary"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 0}
          >
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px]"
              loading="lazy"
              alt=""
              src="/arrow-left.svg"
            />
            <div className="relative leading-[100%] inline-block min-w-[48px]">
              上一页
            </div>
          </button>
          <div className="flex-1 flex flex-row items-center justify-center gap-[8px] min-w-[270px]">
            {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map((page) => (
              <div
                key={page}
                className={`rounded-radius-200 flex flex-col items-center justify-center py-space-200 px-space-300 ${
                  currentPage === page ? "bg-background-brand-default text-text-brand-on-brand" : ""
                }`}
              >
                <div
                  className="relative leading-[100%] inline-block min-w-[8px] cursor-pointer"
                  onClick={() => setCurrentPage(page)}
                >
                  {page + 1}
                </div>
              </div>
            ))}
          </div>
          <button
            className="rounded-radius-200 flex flex-row items-center justify-center py-space-200 px-space-300 gap-[8px]"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === Math.ceil(products.length / itemsPerPage) - 1}
          >
            <div className="relative leading-[100%] inline-block min-w-[48px]">
              下一页
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px]"
              loading="lazy"
              alt=""
              src="/arrow-right.svg"
            />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="删除确认"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-96"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">确认删除</h2>
          <button onClick={handleModalClose} className="text-gray-500 hover:text-black">
            ×
          </button>
        </div>
        <p>你确定要删除这个商品吗？</p>
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={handleModalClose} className="px-4 py-2 border border-black rounded text-black">取消</button>
          <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-black text-white rounded">确认</button>
        </div>
      </Modal>
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  onProductSelect: PropTypes.func.isRequired,
};

export default Container;
