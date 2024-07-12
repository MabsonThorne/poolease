import PropTypes from "prop-types";

const FrameComponent = ({ className = "" }) => {
  return (
    <footer
      className={`w-[1414px] flex flex-row items-start justify-start py-3 px-[433px] box-border relative gap-[307px] max-w-full text-left text-base text-text-neutral-default font-body-base mq450:gap-[38px] mq450:pl-5 mq450:pr-5 mq450:box-border mq825:gap-[77px] mq825:pl-[108px] mq825:pr-[108px] mq825:box-border mq1400:flex-wrap mq1400:gap-[153px] mq1400:pl-[216px] mq1400:pr-[216px] mq1400:box-border ${className}`}
    >
      <div className="h-full w-[1440px] absolute !m-[0] top-[0px] right-[-26px] bottom-[0px]">
        <div className="absolute top-[0px] left-[0px] bg-background-default-default box-border w-full h-full border-[1px] border-solid border-gray-200" />
        <img
          className="absolute top-[15px] left-[38px] w-10 h-10 overflow-hidden z-[1]"
          alt=""
          src="/settings.svg"
        />
      </div>
      <div className="h-[42px] w-[548px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border max-w-full shrink-0">
        <div className="self-stretch h-[42px] rounded-3xs box-border overflow-x-auto shrink-0 flex flex-row items-start justify-start gap-[16px] z-[1] border-[1px] border-solid border-black-100">
          <div className="h-10 flex-[0.4907] rounded-radius-200 bg-black-100 box-border overflow-hidden shrink-0 flex flex-row items-start justify-start py-space-300 pr-[31px] pl-8 gap-[8px] text-background-default-default border-[1px] border-solid border-black-100">
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/star2.svg"
            />
            <div className="self-stretch flex-1 relative leading-[100%]">
              商品
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/x2.svg"
            />
          </div>
          <div className="h-10 flex-1 rounded-lg bg-background-default-default overflow-hidden shrink-0 flex flex-row items-start justify-start py-space-300 px-4 box-border gap-[8px]">
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/star2.svg"
            />
            <div className="self-stretch flex-1 relative leading-[100%]">
              会员管理
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/x2.svg"
            />
          </div>
          <div className="h-10 flex-1 rounded-radius-200 overflow-hidden shrink-0 flex flex-row items-start justify-start py-space-300 px-4 box-border gap-[8px]">
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/star2.svg"
            />
            <div className="self-stretch flex-1 relative leading-[100%]">
              员工管理
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/x2.svg"
            />
          </div>
          <div className="h-10 flex-[0.5062] rounded-radius-200 overflow-hidden shrink-0 flex flex-row items-start justify-start py-space-300 px-8 box-border gap-[8px]">
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/star2.svg"
            />
            <div className="self-stretch flex-1 relative leading-[100%]">
              统计
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/x2.svg"
            />
          </div>
          <div className="h-10 flex-[0.5062] rounded-radius-200 bg-background-default-default overflow-hidden shrink-0 flex flex-row items-start justify-start py-space-300 px-8 box-border gap-[8px] text-text-default-default">
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/star3.svg"
            />
            <div className="self-stretch flex-1 relative leading-[100%]">
              台球
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
              alt=""
              src="/x3.svg"
            />
          </div>
        </div>
      </div>
      <div className="w-[139px] flex flex-row items-start justify-start gap-[12px] shrink-0 text-text-default-secondary">
        <img
          className="h-icon-large w-icon-large relative rounded-radius-full overflow-hidden shrink-0 object-contain z-[1]"
          alt=""
          src="/avatar@2x.png"
        />
        <div className="flex-1 flex flex-col items-start justify-start gap-[2px]">
          <div className="self-stretch h-[22px] relative leading-[140%] font-semibold flex items-center z-[1]">
            值班员工
          </div>
          <div className="self-stretch h-[22px] relative leading-[140%] text-text-default-tertiary flex items-center z-[1]">
            值班时长
          </div>
        </div>
      </div>
    </footer>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
