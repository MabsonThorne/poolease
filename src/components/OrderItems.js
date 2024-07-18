import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

const OrderItems = ({ className = "", propPadding, product, onQuantityChange, resetQuantity, quantity }) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  useEffect(() => {
    if (resetQuantity) {
      setLocalQuantity(0);
    } else {
      setLocalQuantity(quantity);
    }
  }, [resetQuantity, quantity]);

  const orderItemsStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const handleIncrease = () => {
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    onQuantityChange(product.id, newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(0, localQuantity - 1);
    setLocalQuantity(newQuantity);
    onQuantityChange(product.id, newQuantity);
  };

  return (
    <div
      className={`relative flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-center justify-start p-2 box-border gap-2 z-[2] ${className}`}
      style={orderItemsStyle}
    >
      <img
        src={`http://localhost:5002${product.image}`}
        alt={product.name}
        className="w-full h-24 object-cover rounded-t-3xs"
      />
      <div className="w-full text-center text-base font-medium mt-2">
        {product.name}
      </div>
      <div className="w-full flex justify-between mt-2 text-sm">
        <span className="text-base">{product.price}</span>
        <span className="text-base">余量: {product.quantity}</span>
      </div>
      {localQuantity > 0 && (
        <div className="absolute top-[-12px] right-[-12px] w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center z-[4] text-xs">
          {localQuantity}
        </div>
      )}
      <div
        className="absolute bottom-[-12px] left-[-12px] w-6 h-6 flex items-center justify-center cursor-pointer z-[4]"
        onClick={handleDecrease}
      >
        <img src="/reduce.png" alt="reduce" className="w-full h-full object-cover" />
      </div>
      <div
        className="absolute bottom-[-12px] right-[-12px] w-6 h-6 flex items-center justify-center cursor-pointer z-[4]"
        onClick={handleIncrease}
      >
        <img src="/add.png" alt="add" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

OrderItems.propTypes = {
  className: PropTypes.string,
  propPadding: PropTypes.any,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  resetQuantity: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default OrderItems;
