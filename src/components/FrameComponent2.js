import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import CardThreeContainer from "./CardThreeContainer";
import FirstCardContent from "./FirstCardContent";

const FrameComponent2 = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState("台球订单");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        activeTab === "台球订单"
          ? "http://localhost:5002/api/orders"
          : "http://localhost:5002/api/product-orders/get-product-orders"
      );
      setOrders(response.data);
      console.log("Fetched orders:", response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/products");
      const productsMap = {};
      response.data.forEach((product) => {
        productsMap[product.id] = product.name;
      });
      setProducts(productsMap);
      console.log("Fetched products:", productsMap);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "台球订单") {
      return order.table_id; // 过滤台球订单
    } else if (activeTab === "商品订单") {
      return order.total_items; // 过滤商品订单
    } else {
      return true; // 返回所有数据
    }
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === "next" &&
      currentPage < Math.ceil(filteredOrders.length / itemsPerPage) - 1
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderTableRows = () => {
    const rows = [];
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredOrders.slice(startIndex, endIndex);

    currentItems.forEach((order) => {
      if (activeTab === "台球订单") {
        rows.push(
          <tr key={order.id} className="border-b border-gray-200">
            <td className="border border-gray-200 p-2 text-center">{order.id}</td>
            <td className="border border-gray-200 p-2 text-center">{order.table_id}</td>
            <td className="border border-gray-200 p-2 text-center">{order.total_cost}</td>
            <td className="border border-gray-200 p-2 text-center">{order.table_cost}</td>
            <td className="border border-gray-200 p-2 text-center">{order.product_cost}</td>
            <td className="border border-gray-200 p-2 text-center">{new Date(order.start_time).toLocaleString()}</td>
            <td className="border border-gray-200 p-2 text-center">{new Date(order.end_time).toLocaleString()}</td>
            <td className="border border-gray-200 p-2 text-center">操作</td>
          </tr>
        );
      } else if (activeTab === "商品订单") {
        rows.push(
          <tr key={order.id} className="border-b border-gray-200">
            <td className="border border-gray-200 p-2 text-center">{order.id}</td>
            <td className="border border-gray-200 p-2 text-center">
              {JSON.parse(order.total_items).map(item => `${products[item.product_id]} x ${item.quantity}`).join(', ')}
            </td>
            <td className="border border-gray-200 p-2 text-center">{order.total_cost}</td>
            <td className="border border-gray-200 p-2 text-center">操作</td>
          </tr>
        );
      }
    });

    while (rows.length < itemsPerPage) {
      rows.push(
        <tr key={`empty-${rows.length}`} className="border-b border-gray-200">
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
          <td className="border border-gray-200 p-2">&nbsp;</td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <div className={`w-full h-full rounded-xl bg-white p-4 ${className}`}>
      <div className="w-full flex items-center justify-center py-4">
        <div className="relative flex items-center justify-center w-full h-10 border border-solid border-black-100 rounded-radius-200">
          <div
            className={`absolute top-0 bottom-0 left-0 w-1/3 bg-black-100 rounded-radius-200 transition-transform duration-300 ease-in-out ${
              activeTab === "台球订单" ? "translate-x-0" : activeTab === "商品订单" ? "translate-x-full" : "translate-x-[200%]"
            }`}
          />
          {["台球订单", "商品订单", "统计与分析"].map((tab) => (
            <div key={tab} className="relative z-10 flex items-center justify-center w-1/3">
              <button
                onClick={() => handleTabClick(tab)}
                className={`cursor-pointer ${activeTab === tab ? "text-white" : "text-black-100"} text-lg bg-transparent border-none`}
                style={{ width: "100%", height: "100%" }}
              >
                {tab}
              </button>
            </div>
          ))}
        </div>
      </div>

      {(activeTab === "台球订单" || activeTab === "商品订单") && (
        <div className="w-full flex flex-col items-start justify-start gap-4 max-w-full shrink-0 text-darkslategray font-rubik mt-4">
          <table className="self-stretch table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">订单号</th>
                <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">{activeTab === "台球订单" ? "台号" : "售出的商品"}</th>
                <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">总消费</th>
                {activeTab === "台球订单" && (
                  <>
                    <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">台费</th>
                    <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">商品费</th>
                    <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">起始时间</th>
                    <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">结账时间</th>
                  </>
                )}
                <th className="border border-gray-200 p-2 w-1/8 text-lg leading-10 text-center">操作</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
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
                {[...Array(Math.ceil(filteredOrders.length / itemsPerPage)).keys()].map(
                  (page) => (
                    <div
                      key={page}
                      className={`rounded-radius-200 flex flex-col items-center justify-center py-2 px-3 ${
                        currentPage === page ? "bg-background-brand-default text-text-brand-on-brand" : ""
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
                disabled={currentPage === Math.ceil(filteredOrders.length / itemsPerPage) - 1}
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
      )}

      {activeTab === "统计与分析" && (
        <div className="w-full flex flex-col items-start justify-start gap-4 max-w-full text-darkslategray font-rubik mt-4">
          <CardThreeContainer />
          <FirstCardContent />
        </div>
      )}
    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
