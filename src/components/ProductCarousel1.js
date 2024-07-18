import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import OrderItems from "./OrderItems";
import { useTable } from "../contexts/TableProvider";

const ProductCarousel1 = ({ className = "", onBack, orderId, onConfirm }) => {
  const { fetchCurrentOrder, setOrderId } = useTable();
  const [activeTab, setActiveTab] = useState("饮料");
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [resetQuantities, setResetQuantities] = useState(false);
  const [showSelectedProducts, setShowSelectedProducts] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
    const intervalId = setInterval(fetchProducts, 1000);
    return () => clearInterval(intervalId);
  }, [orderId]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  const handleSwipe = (direction) => {
    const totalItems = filteredProducts().length;
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

  const filteredProducts = () => {
    return products.filter((product) => product.category === activeTab);
  };

  const paginatedItems = () => {
    const items = filteredProducts();
    const pages = [];
    for (let i = 0; i < items.length || pages.length === 0; i += itemsPerPage) {
      const pageItems = items.slice(i, i + itemsPerPage);
      while (pageItems.length < itemsPerPage) {
        pageItems.push({ id: `placeholder-${pageItems.length}`, isPlaceholder: true });
      }
      pages.push(pageItems);
    }
    return pages;
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities, [productId]: quantity };
      if (newQuantities[productId] === 0) {
        delete newQuantities[productId];
      }
      return newQuantities;
    });
  };

  const handleCheckout = async () => {
    try {
      const items = Object.entries(selectedQuantities).map(([product_id, quantity]) => ({
        product_id: parseInt(product_id),
        quantity,
      }));

      await axios.post(`http://localhost:5002/api/orders/add-item`, {
        order_id: orderId,
        items,
      });

      fetchCurrentOrder();
      setSelectedQuantities({});
      setResetQuantities(true);
      setTimeout(() => setResetQuantities(false), 0);
      setShowSelectedProducts(false);
      setOrderId(null); // 清理 orderId
      onConfirm(); // 调用确认回调函数，返回到之前的组件
    } catch (error) {
      console.error("Error updating product quantities:", error);
    }
  };

  const handleDeleteProduct = (productId) => {
    setSelectedQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[productId] > 1) {
        newQuantities[productId] -= 1;
      } else {
        delete newQuantities[productId];
      }
      return newQuantities;
    });
  };

  const handleAddProduct = (productId) => {
    setSelectedQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[productId] = (newQuantities[productId] || 0) + 1;
      return newQuantities;
    });
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
              className="grid grid-cols-5 grid-rows-2 gap-4 gap-y-12 box-border p-4 min-w-full"
              style={{ display: 'grid', placeItems: 'center' }}
            >
              {page.map((product) => (
                product.isPlaceholder ? (
                  <div
                    key={product.id}
                    className="w-[160px] h-[200px] rounded-3xs bg-background-default-default flex items-center justify-center"
                  >
                    {/* 空白占位符 */}
                  </div>
                ) : (
                  <OrderItems
                    key={product.id}
                    className="w-[160px] h-[200px] rounded-3xs shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                    propPadding="16px"
                    product={product}
                    onQuantityChange={handleQuantityChange}
                    resetQuantity={resetQuantities}
                    quantity={selectedQuantities[product.id] || 0}
                    stock={product.stock}
                  />
                )
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center w-full mt-[-30px]">
        {pages.map((_, pageIndex) => (
          <div
            key={pageIndex}
            className={`w-3 h-3 rounded-full mx-1 ${currentPage === pageIndex ? "bg-black" : "bg-gray-300"}`}
            onClick={() => setCurrentPage(pageIndex)}
          />
        ))}
      </div>
      <div className="self-stretch flex flex-col items-center justify-center mt-[-25px] gap-2">
        <div className="flex justify-between w-full max-w-[600px]">
          <button
            className="bg-white border border-black-100 text-black-100 py-2 px-4 rounded-3xs hover:bg-gray-200"
            onClick={() => {
              setOrderId(null); // 清理 orderId
              onBack(); // 返回到之前的组件
            }}
          >
            返回
          </button>
          <button
            className="bg-white border border-black-100 text-black-100 py-2 px-4 rounded-3xs hover:bg-gray-200 relative"
            onClick={() => setShowSelectedProducts(!showSelectedProducts)}
          >
            已选商品
            {Object.keys(selectedQuantities).length > 0 && (
              <div className="absolute top-0 right-0 transform translate-x-1/2 translate-y-[-50%] w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                {Object.keys(selectedQuantities).reduce((total, key) => total + selectedQuantities[key], 0)}
              </div>
            )}
          </button>
          <button
            className="bg-black-100 text-background-default-default py-2 px-4 rounded-3xs hover:bg-gray-700"
            onClick={handleCheckout}
          >
            确认
          </button>
        </div>
        {showSelectedProducts && (
          <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white border border-black-100 rounded-lg shadow-lg p-4 w-full max-w-[700px] h-[350px] z-50 overflow-y-auto overflow-x-hidden">
            <div className="h-full w-full overflow-y-auto no-scrollbar">
              {Object.entries(selectedQuantities).length > 0 ? (
                Object.entries(selectedQuantities).map(([productId, quantity]) => {
                  const product = products.find((product) => product.id === parseInt(productId));
                  return (
                    <div key={productId} className="grid grid-cols-3 items-center mb-2 relative border-b border-gray-300 pb-2 text-center" style={{ gridTemplateColumns: '0.5fr 1fr 1fr' }}>
                      <span className="text-sm col-span-1">{product.name}</span>
                      <span className="text-sm col-span-1">{product.price}</span>
                      <div className="flex items-center justify-center col-span-1">
                        <button
                          className="flex items-center justify-center"
                          onClick={() => handleDeleteProduct(productId)}
                        >
                          <img src="/reduce.png" alt="reduce" className="w-6 h-6" style={{ backgroundColor: 'transparent' }} />
                        </button>
                        <button
                          className="flex items-center justify-center ml-2"
                          onClick={() => handleAddProduct(productId)}
                        >
                          <img src="/add.png" alt="add" className="w-6 h-6" />
                        </button>
                        <div className="absolute top-0 right-0 transform translate-x-[-10%] translate-y-[0%] w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                          {quantity}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-sm text-gray-400">没有已选商品</span>
                </div>
              )}
              {Object.entries(selectedQuantities).length < 6 &&
                new Array(6 - Object.entries(selectedQuantities).length).fill(null).map((_, index) => (
                  <div key={index} className="grid grid-cols-3 items-center mb-2 relative border-b border-gray-300 pb-2 text-center">
                    <span className="text-sm col-span-1"></span>
                    <span className="text-sm col-span-1"></span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ProductCarousel1.propTypes = {
  className: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ProductCarousel1;
