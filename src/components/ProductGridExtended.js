import PropTypes from "prop-types";

const ProductGridExtended = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-row flex-wrap items-start justify-start gap-[62px_47px] min-h-[424px] text-left text-smi text-black-100 font-body-base mq750:gap-[23px] ${className}`}
    >
      <div className="w-[154px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 box-border gap-[3px] z-[2]">
        <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
        <div className="relative inline-block min-w-[39px] z-[3]">商品名</div>
        <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
      </div>
      <div className="w-[154px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 box-border gap-[3px] z-[2]">
        <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
        <div className="relative inline-block min-w-[39px] z-[3]">商品名</div>
        <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
      </div>
      <div className="w-[154px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 box-border gap-[3px] z-[2]">
        <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
        <div className="relative inline-block min-w-[39px] z-[3]">商品名</div>
        <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
      </div>
      <div className="w-[154px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 box-border gap-[3px] z-[2]">
        <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
        <div className="relative inline-block min-w-[39px] z-[3]">商品名</div>
        <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
      </div>
      <div className="w-[154px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 box-border gap-[3px] z-[2]">
        <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
        <div className="relative inline-block min-w-[39px] z-[3]">商品名</div>
        <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
      </div>
      <div className="w-[154px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 box-border gap-[3px] z-[2]">
        <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
        <div className="relative inline-block min-w-[39px] z-[3]">商品名</div>
        <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
      </div>
    </div>
  );
};

ProductGridExtended.propTypes = {
  className: PropTypes.string,
};

export default ProductGridExtended;
