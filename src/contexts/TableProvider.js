import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TableContext = createContext();

export const useTable = () => useContext(TableContext);

const TableProvider = ({ children, tableId, refreshTableSelection }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [tableCost, setTableCost] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [dayRate, setDayRate] = useState(18);
  const [nightRate, setNightRate] = useState(20);
  const [showPriceSetting, setShowPriceSetting] = useState(false);
  const [showSwitchTableDialog, setShowSwitchTableDialog] = useState(false);
  const [availableTables, setAvailableTables] = useState([]);
  const [newTableId, setNewTableId] = useState(null); // 新添加的状态
  const [orderId, setOrderId] = useState(null);
  const [billingState, setBillingState] = useState('IDLE');
  const [currentOrderItems, setCurrentOrderItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderNotFound, setOrderNotFound] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (tableId && !orderNotFound) {
      fetchCurrentOrder();
    }
  }, [tableId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const fetchCurrentOrder = async () => {
    if (!tableId || orderNotFound) {
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5002/api/orders/current/${tableId}`);
      if (response.data) {
        setOrderId(response.data.id);
        setBillingState('BILLING');
        setElapsedSeconds(Math.floor((new Date() - new Date(response.data.start_time)) / 1000));
        setTotalCost(response.data.total_cost);
        setTableCost(response.data.table_cost);
        setCurrentOrderItems(response.data.items);
        setOrderNotFound(false);
      } else {
        resetOrderData();
        setOrderNotFound(true);
      }
    } catch (error) {
      resetOrderData();
      setOrderNotFound(true);
    }
  };

  const resetOrderData = () => {
    setBillingState('IDLE');
    setElapsedSeconds(0);
    setTotalCost(0);
    setTableCost(0);
    setOrderId(null);
    setCurrentOrderItems([]);
  };

  useEffect(() => {
    if (billingState === 'BILLING') {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
        fetchBillingUpdate();
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [billingState]);

  const fetchBillingUpdate = async () => {
    if (!tableId || orderNotFound) return;

    try {
      const response = await axios.get(`http://localhost:5002/api/orders/current/${tableId}`);
      if (response.data) {
        setTotalCost(response.data.total_cost);
        setTableCost(response.data.table_cost);
        setCurrentOrderItems(response.data.items);
      }
    } catch (error) {
      // 这里不需要处理错误日志
    }
  };

  const startBilling = async () => {
    if (!tableId) {
      console.error('tableId is required to start billing');
      return;
    }

    const requestData = { table_id: tableId };

    try {
      const response = await axios.post('http://localhost:5002/api/orders', requestData);
      setOrderId(response.data.id);
      setBillingState('BILLING');
      setOrderNotFound(false); // 重新开始计费时重置状态
      refreshTableSelection();
    } catch (error) {
      console.error('Error starting billing:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  const handleBilling = async () => {
    if (billingState === 'IDLE') {
      await startBilling();
    } else if (billingState === 'BILLING') {
      setBillingState('PAUSED');
    } else if (billingState === 'PAUSED') {
      setBillingState('BILLING');
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.put(`http://localhost:5002/api/orders/checkout/${orderId}`);
      await axios.put(`http://localhost:5002/api/pool-tables/${tableId}/status`, { status: 0 });
      resetOrderData();
      refreshTableSelection();
    } catch (error) {
      console.error('Error checking out:', error.message);
    }
  };

  const handleSavePrices = (prices) => {
    setDayRate(prices.day);
    setNightRate(prices.night);
  };

  const handleSwitchTable = async () => {
    try {
      await axios.post('http://localhost:5002/api/pool-tables/switch-table', {
        currentTableId: tableId,
        newTableId,
      });
      setShowSwitchTableDialog(false);
      resetOrderData();
    } catch (error) {
      console.error('Error switching table:', error.message);
    }
  };

  return (
    <TableContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        totalCost,
        setTotalCost,
        tableCost,
        setTableCost,
        elapsedSeconds,
        setElapsedSeconds,
        dayRate,
        nightRate,
        showPriceSetting,
        setShowPriceSetting,
        showSwitchTableDialog,
        setShowSwitchTableDialog,
        availableTables,
        setAvailableTables,
        newTableId,
        setNewTableId,
        orderId,
        setOrderId,
        billingState,
        handleBilling,
        handleCheckout,
        handleSavePrices,
        handleSwitchTable,
        tableId,
        fetchCurrentOrder,
        currentOrderItems,
        products,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
  tableId: PropTypes.number,
  refreshTableSelection: PropTypes.func.isRequired,
};

export default TableProvider;
