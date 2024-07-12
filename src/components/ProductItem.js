import PropTypes from "prop-types";

const ProductItem = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch bg-background-default-default box-border flex flex-row items-start justify-between pt-3 pb-2.5 pr-[13px] pl-[38px] top-[0] z-[99] sticky max-w-full gap-[20px] text-left text-base text-text-default-secondary font-body-base border-b-[1px] border-solid border-gray-200 ${className}`}
    >
      <div className="h-[71px] w-[1440px] relative bg-background-default-default box-border hidden max-w-full border-b-[1px] border-solid border-gray-200" />
      <div className="w-[88px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
        <img
          className="w-10 h-10 relative overflow-hidden shrink-0 z-[1]"
          loading="lazy"
          alt=""
          src="/settings.svg"
        />
      </div>
      <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border max-w-full">
        <nav className="m-0 rounded-3xs flex flex-row items-start justify-start gap-[16px] z-[1] text-left text-base text-text-neutral-default font-body-base border-[1px] border-solid border-black-100 mq1050:hidden">
          <button className="cursor-pointer py-2.5 pr-[31px] pl-8 bg-black-100 rounded-radius-200 overflow-hidden flex flex-row items-start justify-start gap-[8px] border-[1px] border-solid border-black-100">
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/star2.svg"
            />
            <div className="relative text-base leading-[100%] font-body-base text-background-default-default text-left inline-block min-w-[32px]">
              商品
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/x2.svg"
            />
          </button>
          <div className="rounded-radius-200 overflow-hidden flex flex-row items-start justify-start py-space-300 px-4 gap-[8px]">
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/star2.svg"
            />
            <div className="relative leading-[100%] inline-block min-w-[64px]">
              会员管理
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/x2.svg"
            />
          </div>
          <div className="rounded-radius-200 overflow-hidden flex flex-row items-start justify-start py-space-300 px-4 gap-[8px]">
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/star2.svg"
            />
            <div className="relative leading-[100%] inline-block min-w-[64px]">
              员工管理
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/x2.svg"
            />
          </div>
          <div className="rounded-radius-200 overflow-hidden flex flex-row items-start justify-start py-space-300 px-8 gap-[8px]">
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/star2.svg"
            />
            <div className="relative leading-[100%] inline-block min-w-[32px]">
              统计
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/x2.svg"
            />
          </div>
          <div className="rounded-radius-200 overflow-hidden flex flex-row items-start justify-start py-space-300 px-8 gap-[8px] text-black-100">
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/star3.svg"
            />
            <div className="relative leading-[100%] inline-block min-w-[32px]">
              台球
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/x3.svg"
            />
          </div>
        </nav>
      </div>
      <div className="w-[139px] flex flex-row items-start justify-start gap-[12px]">
        <img
          className="h-icon-large w-icon-large relative rounded-radius-full overflow-hidden shrink-0 object-cover z-[1]"
          loading="lazy"
          alt=""
          src="/avatar@2x.png"
        />
        <div className="flex-1 flex flex-col items-start justify-start gap-[2px]">
          <div className="self-stretch relative leading-[140%] font-semibold z-[1]">
            值班员工
          </div>
          <div className="self-stretch relative leading-[140%] text-text-default-tertiary z-[1]">
            值班时长
          </div>
        </div>
      </div>
    </header>
  );
};

ProductItem.propTypes = {
  className: PropTypes.string,
};

export default ProductItem;
