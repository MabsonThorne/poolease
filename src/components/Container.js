// src/components/Container.js

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = ({ className = "", onProductSelect, onDelete }) => {
  const [activeTab, setActiveTab] = useState("饮料");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
    const intervalId = setInterval(fetchProducts, 5000);
    return () => clearInterval(intervalId);
  }, [activeTab]);

  useEffect(() => {
    handleSearch();
  }, [products, searchQuery]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/products");
      const filteredProducts = response.data.filter(
        (product) => product.category === activeTab
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(0);
    setSearchQuery("");
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === "next" &&
      currentPage < Math.ceil(filteredProducts.length / itemsPerPage) - 1
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRowClick = (product) => {
    setSelectedProductId(selectedProductId === product.id ? null : product.id);
    onProductSelect(product);
  };

  const renderTableRows = () => {
    const rows = [];
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredProducts.slice(startIndex, endIndex);

    currentItems.forEach((product) => {
      rows.push(
        <tr
          key={product.id}
          className={`border-b border-gray-200 ${
            selectedProductId === product.id ? "selected-row" : ""
          }`}
          onClick={() => handleRowClick(product)}
          style={
            selectedProductId === product.id
              ? { border: "2px solid black", borderRadius: "10px" }
              : {}
          }
        >
          <td className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
            {product.name}
          </td>
          <td className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center text-lightslategray-200">
            {product.price}
          </td>
          <td className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
            {product.quantity}
          </td>
          <td className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center text-lightslategray-200">
            {product.cost_price}
          </td>
          <td className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
            <img
              className="h-6 w-6 mx-auto cursor-pointer"
              loading="lazy"
              alt="删除"
              src="trash-2.svg"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product);
              }}
              style={{ display: "block", margin: "0 auto" }}
            />
          </td>
        </tr>
      );
    });

    while (rows.length < itemsPerPage) {
      rows.push(
        <tr key={`empty-${rows.length}`} className="border-b border-gray-200">
          <td className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
            &nbsp;
          </td>
          <td className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
            &nbsp;
          </td>
          <td className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
            &nbsp;
          </td>
          <td className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
            &nbsp;
          </td>
          <td className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
            &nbsp;
          </td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <div
      className={`w-full h-full rounded-xl bg-background-default-default flex flex-col items-end justify-start pt-4 px-4 pb-4 box-border gap-4 max-w-full z-2 text-left text-base text-gray-200 font-body-base ${className}`}
    >
      <div className="w-full flex flex-row items-start justify-start gap-4 max-w-full text-2xl">
        <div className="flex-1 rounded-3xs bg-background-default-default box-border flex flex-row items-center justify-between py-2.5 px-4 min-w-40 max-w-full z-3 border border-solid border-black-100">
          <input
            type="text"
            className="w-full h-full bg-background-default-default border-none focus:outline-none"
            placeholder="请输入商品名"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="h-full cursor-pointer py-2.5 px-8 bg-background-brand-default rounded-radius-200 overflow-hidden flex flex-row items-center justify-start gap-2 z-3 border border-solid border-background-brand-default"
          onClick={handleSearch}
          style={{ height: "42px" }} // 确保搜索按钮和输入框高度一致
        >
          <div className="relative text-base leading-normal font-body-base text-text-brand-on-brand text-left">
            搜索
          </div>
        </button>
      </div>
      <div className="w-full flex items-center justify-center py-4">
        <div className="relative flex items-center justify-center w-full h-10 border border-solid border-black-100 rounded-radius-200">
          <div
            className={`absolute top-0 bottom-0 left-0 w-1/5 bg-black-100 rounded-radius-200 transition-transform duration-300 ease-in-out ${
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
            <div key={tab} className="relative z-10 flex items-center justify-center w-1/5">
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
              <th className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
                名称
              </th>
              <th className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
                价格
              </th>
              <th className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
                数量
              </th>
              <th className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
                进价
              </th>
              <th className="border border-gray-200 p-2 w-1/5 h-10 text-lg leading-10 text-center">
                操作
              </th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-7 box-border max-w-full text-text-default-default mt-2">
        <div className="w-full flex flex-row items-center justify-between gap-2 max-w-full z-3">
          <button
            className="rounded-radius-200 flex flex-row items-center justify-center py-2 px-3 gap-2 opacity-50 text-text-default-secondary"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 0}
          >
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 min-h-4"
              loading="lazy"
              alt=""
              src="arrow-left.svg"
            />
            <div className="relative leading-normal inline-block min-w-12">上一页</div>
          </button>
          <div className="flex-1 flex flex-row items-center justify-center gap-2 min-w-[270px]">
            {[...Array(Math.ceil(filteredProducts.length / itemsPerPage)).keys()].map(
              (page) => (
                <div
                  key={page}
                  className={`rounded-radius-200 flex flex-col items-center justify-center py-2 px-3 ${
                    currentPage === page
                      ? "bg-background-brand-default text-text-brand-on-brand"
                      : ""
                  }`}
                >
                  <div
                    className="relative leading-normal inline-block min-w-2 cursor-pointer"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page + 1}
                  </div>
                </div>
              )
            )}
          </div>
          <button
            className="rounded-radius-200 flex flex-row items-center justify-center py-2 px-3 gap-2"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage) - 1}
          >
            <div className="relative leading-normal inline-block min-w-12">下一页</div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 min-h-4"
              loading="lazy"
              alt=""
              src="arrow-right.svg"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  onProductSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Container;
