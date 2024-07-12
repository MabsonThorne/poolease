import { useMemo } from "react";
import PropTypes from "prop-types";

const OrderItems = ({ className = "", propPadding, name, price, quantity, stock }) => {
  const orderItemsStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div
      className={`relative flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-center justify-start p-2 box-border gap-2 z-[2] ${className}`}
      style={orderItemsStyle}
    >
      <img
        src="/path/to/image.jpg" // 请替换为实际图片路径
        alt={name}
        className="w-full h-24 object-cover rounded-t-3xs"
      />
      <div className="w-full text-center text-base font-medium mt-2">
        {name}
      </div>
      <div className="w-full flex justify-between mt-2 text-sm">
        <span className="text-base">{price}</span>
        <span className="text-base">余量: {stock}</span>
      </div>
      <div className="absolute top-[-12px] left-[-12px] w-6 h-6 bg-gray-300 text-black rounded-full flex items-center justify-center cursor-pointer z-[4]">
        -
      </div>
      <div className="absolute top-[-12px] right-[-12px] w-6 h-6 bg-gray-300 text-black rounded-full flex items-center justify-center cursor-pointer z-[4]">
        +
      </div>
      {quantity > 0 && (
        <div className="absolute bottom-[-12px] right-[-12px] w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center z-[4]">
          {quantity}
        </div>
      )}
    </div>
  );
};

OrderItems.propTypes = {
  className: PropTypes.string,
  propPadding: PropTypes.any,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
};

export default OrderItems;
