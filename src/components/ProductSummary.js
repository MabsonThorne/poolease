import OrderItems from "./OrderItems";
import ProductGridExtended from "./ProductGridExtended";
import PropTypes from "prop-types";

const ProductSummary = ({ className = "" }) => {
  return (
    <div
      className={`flex-1 rounded-xl bg-background-default-default flex flex-col items-end justify-start pt-12 px-14 pb-[39px] box-border gap-[40px] min-w-[442px] max-w-full z-[1] text-left text-13xl text-black-100 font-body-base mq750:gap-[20px] mq750:pl-7 mq750:pr-7 mq750:box-border mq750:min-w-full mq1050:pt-[31px] mq1050:pb-[25px] mq1050:box-border mq450:pt-5 mq450:pb-5 mq450:box-border ${className}`}
    >
      <div className="w-[680px] h-[905px] relative rounded-xl bg-background-default-default hidden max-w-full" />
      <OrderItems propPadding="0px 0px 13px" />
      <ProductGridExtended />
      <div className="self-stretch flex flex-col items-start justify-start gap-[23px] max-w-full">
        <div className="flex flex-row items-start justify-start gap-[14px]">
          <h1 className="m-0 w-24 relative text-inherit font-normal font-inherit inline-block z-[2] mq1050:text-7xl mq450:text-lgi">
            共计：
          </h1>
          <div className="relative text-red-200 inline-block min-w-[120px] z-[2] mq1050:text-7xl mq450:text-lgi">
            ￥00.00
          </div>
        </div>
        <div className="self-stretch rounded-3xs bg-black-100 flex flex-row items-start justify-center pt-[9px] px-5 pb-2.5 box-border max-w-full z-[2] text-background-default-default">
          <div className="h-[58px] w-[564px] relative rounded-3xs bg-black-100 hidden max-w-full" />
          <h1 className="m-0 relative text-inherit font-normal font-inherit inline-block min-w-[64px] z-[3] mq1050:text-7xl mq450:text-lgi">
            结账
          </h1>
        </div>
      </div>
    </div>
  );
};

ProductSummary.propTypes = {
  className: PropTypes.string,
};

export default ProductSummary;
