import OrderItems from "./OrderItems";
import ItemOne from "./ItemOne";
import PropTypes from "prop-types";

const Order = ({ className = "" }) => {
  return (
    <div
      className={`flex-1 rounded-xl bg-background-default-default flex flex-col items-end justify-start pt-[52px] pb-[25px] pr-[73px] pl-[43px] box-border gap-[52px] min-w-[442px] max-w-full z-[1] text-left text-13xl text-black-100 font-body-base mq450:pt-[22px] mq450:box-border mq750:gap-[26px] mq750:pl-[21px] mq750:pr-9 mq750:box-border mq750:min-w-full mq1050:pt-[34px] mq1050:pb-5 mq1050:box-border ${className}`}
    >
      <div className="w-[680px] h-[905px] relative rounded-xl bg-background-default-default hidden max-w-full" />
      <div className="self-stretch flex flex-col items-start justify-start gap-[30px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
          <div className="relative leading-[39.2px] whitespace-nowrap z-[2]">
            <span>选择商品</span>
            <span className="text-mini">（点击选择）</span>
          </div>
          <OrderItems />
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[30px_47px] min-h-[392px] text-smi mq750:gap-[23px]">
          <ItemOne propWidth="154px" />
          <div className="w-[154px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 box-border gap-[3px] z-[2]">
            <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
            <div className="relative inline-block min-w-[39px] z-[3]">
              商品名
            </div>
            <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
          </div>
          <div className="w-[154px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 box-border gap-[3px] z-[2]">
            <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
            <div className="relative inline-block min-w-[39px] z-[3]">
              商品名
            </div>
            <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
          </div>
          <div className="w-[154px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 box-border gap-[3px] z-[2]">
            <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
            <div className="relative inline-block min-w-[39px] z-[3]">
              商品名
            </div>
            <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
          </div>
          <div className="w-[154px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 box-border gap-[3px] z-[2]">
            <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
            <div className="relative inline-block min-w-[39px] z-[3]">
              商品名
            </div>
            <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
          </div>
          <div className="w-[154px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 box-border gap-[3px] z-[2]">
            <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
            <div className="relative inline-block min-w-[39px] z-[3]">
              商品名
            </div>
            <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[32px] max-w-full mq750:gap-[16px]">
        <div className="flex flex-row items-start justify-start py-0 px-1">
          <div className="flex flex-row items-start justify-start gap-[14px]">
            <h1 className="m-0 w-24 relative text-inherit font-normal font-inherit inline-block z-[2] mq450:text-lgi mq1050:text-7xl">
              共计：
            </h1>
            <div className="relative text-red-200 inline-block min-w-[120px] z-[2] mq450:text-lgi mq1050:text-7xl">
              ￥00.00
            </div>
          </div>
        </div>
        <button className="cursor-pointer [border:none] pt-2 px-5 pb-[11px] bg-red-200 self-stretch rounded-3xs flex flex-row items-start justify-center box-border max-w-full z-[2] hover:bg-red-100">
          <div className="h-[58px] w-[564px] relative rounded-3xs bg-red-200 hidden max-w-full" />
          <div className="relative text-13xl font-body-base text-background-default-default text-left inline-block min-w-[128px] z-[3] mq450:text-lgi mq1050:text-7xl">
            确认商品
          </div>
        </button>
      </div>
    </div>
  );
};

Order.propTypes = {
  className: PropTypes.string,
};

export default Order;
