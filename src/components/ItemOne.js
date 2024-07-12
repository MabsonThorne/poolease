import { useMemo } from "react";
import PropTypes from "prop-types";

const ItemOne = ({ className = "", propWidth, quantity = 0, showMinusButton = false }) => {
  const itemOneStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div
      className={`relative h-[200px] w-[160px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-start pt-[7px] px-0 pb-2.5 box-border gap-[3px] z-[2] text-left text-smi text-black-100 font-body-base ${className}`}
      style={itemOneStyle}
    >
      <div className="self-stretch h-[200px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
      <img
        className="self-stretch flex-1 max-w-full overflow-hidden max-h-full object-cover z-[3]"
        loading="lazy"
        alt=""
        src="/image@2x.png"
      />
      <div className="flex flex-row items-start justify-start py-0 px-1.5">
        <div className="relative inline-block min-w-[39px] z-[3]">商品名</div>
      </div>
      <div className="flex flex-row items-start justify-start py-0 px-1.5">
        <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
      </div>
      {quantity > 0 && (
        <div className="absolute top-0 left-0 transform translate-x-[-50%] translate-y-[-50%] w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center z-[4]">
          {quantity}
        </div>
      )}
      {showMinusButton && (
        <div className="absolute top-0 right-0 transform translate-x-[50%] translate-y-[-50%] w-6 h-6 bg-gray-300 text-black rounded-full flex items-center justify-center cursor-pointer z-[4]">
          -
        </div>
      )}
    </div>
  );
};

ItemOne.propTypes = {
  className: PropTypes.string,
  propWidth: PropTypes.any,
  quantity: PropTypes.number,
  showMinusButton: PropTypes.bool,
};

export default ItemOne;
