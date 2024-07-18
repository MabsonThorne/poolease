import React, { useState, useEffect, useCallback } from "react";
import { useTable } from "../contexts/TableProvider";
import PropTypes from "prop-types";
import PriceSettingDialog from "./PriceSettingDialog";
import ItemOne from "./ItemOne";
import { useSwipeable } from "react-swipeable";
import SwitchTableDialog from "./SwitchTableDialog";
import ScanQRCodeDialog from "./ScanQRCodeDialog";

const TableInfo = ({ className = '', showMinusButton = false, tableId, refreshTableSelection }) => {
  const {
    currentPage,
    setCurrentPage,
    totalCost,
    tableCost,
    elapsedSeconds,
    billingState,
    handleBilling,
    handleCheckout,
    showPriceSetting,
    setShowPriceSetting,
    showSwitchTableDialog,
    setShowSwitchTableDialog,
    availableTables,
    newTableId, // 确保包含 newTableId
    setNewTableId, // 确保包含 setNewTableId
    handleSwitchTable,
    handleSavePrices,
    fetchCurrentOrder,
    currentOrderItems = [],
    products,
  } = useTable();

  const [showScanDialog, setShowScanDialog] = useState(false);

  useEffect(() => {
    if (tableId) {
      fetchCurrentOrder();
    }
  }, [tableId, fetchCurrentOrder]);

  const handleCheckoutWithScan = () => {
    setShowScanDialog(true);
  };

  const handleScanComplete = () => {
    setTimeout(() => {
      setShowScanDialog(false);
      handleCheckout();
    }, 2000);
  };

  const renderItems = () => {
    return currentOrderItems.map((item) => {
      const product = products.find(p => p.id === item.product_id);
      if (product) {
        return (
          <ItemOne
            key={item.product_id}
            className="w-[160px] h-[200px] rounded-3xs shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
            propWidth="160px"
            quantity={item.quantity}
            showMinusButton={showMinusButton}
            product={{
              name: product.name,
              price: product.price,
              image: product.image,
            }}
          />
        );
      }
      return null;
    }).filter(item => item !== null);
  };

  const paginatedItems = () => {
    const items = renderItems();
    const pages = [];
    const itemsPerPage = 6;

    for (let i = 0; i < items.length; i += itemsPerPage) {
      const pageItems = items.slice(i, i + itemsPerPage);
      while (pageItems.length < itemsPerPage) {
        pageItems.push(
          <div key={`placeholder-${i + pageItems.length}`} className="w-[160px] h-[200px] rounded-3xs"></div>
        );
      }
      pages.push(pageItems);
    }

    if (pages.length === 0) {
      const emptyPage = Array.from({ length: itemsPerPage }, (_, index) => (
        <div key={`empty-${index}`} className="w-[160px] h-[200px] rounded-3xs"></div>
      ));
      pages.push(emptyPage);
    }

    return pages;
  };

  const pages = paginatedItems();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('LEFT'),
    onSwipedRight: () => handleSwipe('RIGHT'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwipe = (direction) => {
    if (direction === 'LEFT' && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'RIGHT' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div
      className={`flex-1 rounded-xl bg-background-default-default flex flex-col items-start justify-start py-[10px] pr-[20px] pl-[20px] box-border gap-[10px] min-w-[442px] max-w-full z-[1] text-left text-13xl text-black-100 font-body-base ${className}`}
      {...swipeHandlers}
    >
      <PriceSettingDialog isOpen={showPriceSetting} onClose={() => setShowPriceSetting(false)} onSave={handleSavePrices} />
      <SwitchTableDialog
        showSwitchTableDialog={showSwitchTableDialog}
        newTableId={newTableId}
        setNewTableId={setNewTableId}
        currentTableId={tableId}
        setShowSwitchTableDialog={setShowSwitchTableDialog}
        refreshTableSelection={refreshTableSelection}
      />
      <ScanQRCodeDialog
        isOpen={showScanDialog}
        onClose={() => setShowScanDialog(false)}
        onScanComplete={handleScanComplete}
      />
      <div className="w-full h-full relative rounded-xl bg-background-default-default hidden max-w-full" />
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-1 box-border max-w-full">
        <div className="flex-1 flex flex-col items-start justify-start gap-[10px] max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-1.5 box-border gap-[10px] max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[10px] max-w-full">
              <div className="self-stretch flex flex-row items-end justify-start gap-[10px] max-w-full flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-start gap-[5.4px] min-w-[292px] max-w-full">
                  <div className="flex flex-row items-center justify-between w-full gap-[18px]">
                    <div className="flex flex-row items-center gap-[10px]">
                      <a className="[text-decoration:none] flex-1 relative text-[inherit] inline-block z-[2] text-lgi text-7xl">
                        <span className="text-inherit">开台时间：</span>
                      </a>
                      <a className="[text-decoration:none] relative text-red-200 whitespace-nowrap z-[2] text-lgi text-7xl">
                        {formatTime(elapsedSeconds)}
                      </a>
                    </div>
                    <button
                      className="cursor-pointer [border:none] py-3 px-[9px] bg-red-200 rounded-3xs flex flex-row items-center justify-center z-[2] hover:bg-red-100"
                      style={{ height: '39px' }}
                      onClick={handleBilling}
                    >
                      <div className="h-[42px] w-[108px] relative rounded-3xs bg-red-200 hidden" />
                      <a className="[text-decoration:none] relative text-mini font-body-base text-background-default-default text-left inline-block z-[3]">
                        {billingState === 'IDLE' ? '点击开始计费' : billingState === 'BILLING' ? '点击暂停计费' : '点击继续计费'}
                      </a>
                    </button>
                  </div>
                  <img className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain shrink-0 mt-[-1px] z-[2]" loading="lazy" alt="" src="/line-2.svg" />
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-[10px] mt-[-10px]">
                <h1 className="m-0 w-24 relative text-inherit font-normal font-inherit inline-block z-[2] text-lgi text-7xl">
                  <span className="text-inherit">台费：</span>
                </h1>
                <div className="relative text-red-200 inline-block min-w-[120px] z-[2] text-lgi text-7xl">
                  ￥{tableCost.toFixed(2)}
                </div>
                <button
                  className="cursor-pointer [border:none] py-3 px-[9px] bg-black rounded-3xs flex flex-row items-center justify-center z-[2] hover:bg-gray-800"
                  onClick={() => setShowSwitchTableDialog(true)}
                  style={{ height: '39px', color: 'white' }}
                >
                  <div className="h-[42px] w-[108px] relative rounded-3xs hidden" />
                  <a className="[text-decoration:none] relative text-mini font-body-base text-background-default-default text-left inline-block z-[3]">换台</a>
                </button>
              </div>
              <h2 className="m-0 w-full relative text-inherit font-normal font-inherit inline-block z-[2] text-lgi text-7xl mt-[0px]">
                <span className="text-inherit">已选商品：</span>
              </h2>
            </div>
            <img className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain mt-[-20px] z-[2]" loading="lazy" alt="" src="/line-3.svg" />
          </div>
          <div className="w-full flex overflow-hidden relative">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
              {pages.map((page, pageIndex) => (
                <div key={pageIndex} className="grid grid-cols-3 grid-rows-2 gap-x-8 gap-y-8 min-w-full box-border p-4">
                  {page}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center w-full mt-2">
            {pages.map((_, pageIndex) => (
              <div key={pageIndex} className={`w-3 h-3 rounded-full mx-1 ${currentPage === pageIndex ? 'bg-black' : 'bg-gray-300'}`} onClick={() => setCurrentPage(pageIndex)} />
            ))}
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[10px] max-w-full">
        <div className="flex flex-row items-start justify-start py-0 px-1">
          <div className="flex flex-row items-start justify-start gap-[10px]">
            <h1 className="m-0 w-24 relative text-inherit font-normal font-inherit inline-block z-[2] text-lgi text-7xl">
              <span className="text-inherit">共计：</span>
            </h1>
            <div className="relative text-red-200 inline-block min-w-[120px] z-[2] text-lgi text-7xl">
              ￥{totalCost.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-3xs bg-black-100 flex flex-row items-start justify-center pt-[9px] px-5 pb-2.5 box-border max-w-full z-[2] text-background-default-default cursor-pointer" onClick={handleCheckoutWithScan}>
          <div className="h-[58px] w-[564px] relative rounded-3xs bg-black-100 hidden max-w-full" />
          <h1 className="m-0 relative text-inherit font-normal font-inherit inline-block min-w-[64px] z-[3] text-lgi text-7xl">
            <span className="text-inherit">结账</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

TableInfo.propTypes = {
  className: PropTypes.string,
  showMinusButton: PropTypes.bool,
  tableId: PropTypes.number.isRequired,
  refreshTableSelection: PropTypes.func.isRequired,
};

export default TableInfo;
