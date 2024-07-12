import FrameComponent from "./FrameComponent";
import PropTypes from "prop-types";

const FooterContent = ({ className = "" }) => {
  return (
    <div
      className={`flex-1 rounded-xl bg-background-default-default flex flex-col items-start justify-start pt-[39px] pb-[49px] pr-[49px] pl-16 box-border relative gap-[52px] min-w-[442px] max-w-full z-[1] text-left text-13xl text-black-100 font-body-base mq450:pt-5 mq450:pb-[21px] mq450:box-border mq750:gap-[26px] mq750:pl-8 mq750:pr-6 mq750:box-border mq750:min-w-full mq1050:pt-[25px] mq1050:pb-8 mq1050:box-border ${className}`}
    >
      <div className="w-[680px] h-[905px] relative rounded-xl bg-background-default-default hidden max-w-full z-[0]" />
      <img
        className="w-8 h-8 absolute !m-[0] top-[281px] right-[239px] overflow-hidden shrink-0 z-[3]"
        loading="lazy"
        alt=""
        src="/minus-circle.svg"
      />
      <img
        className="w-8 h-8 absolute !m-[0] top-[281px] right-[36px] overflow-hidden shrink-0 z-[3]"
        alt=""
        src="/minus-circle.svg"
      />
      <div className="self-stretch flex flex-col items-start justify-start gap-[30px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-1.5 box-border gap-[6px] max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[47px] max-w-full mq750:gap-[23px]">
            <div className="self-stretch flex flex-row items-end justify-start gap-[9px] max-w-full mq750:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-start gap-[5.4px] min-w-[292px] max-w-full">
                <div className="w-[335px] flex flex-row items-start justify-start gap-[37px] shrink-0 max-w-full mq450:flex-wrap mq450:gap-[18px]">
                  <a className="[text-decoration:none] flex-1 relative text-[inherit] inline-block min-w-[104px] z-[2] mq450:text-lgi mq1050:text-7xl">
                    开台时间：
                  </a>
                  <a className="[text-decoration:none] relative text-red-200 whitespace-nowrap z-[2] mq450:text-lgi mq1050:text-7xl">
                    00:00:00
                  </a>
                </div>
                <img
                  className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain shrink-0 mt-[-1px] z-[2]"
                  loading="lazy"
                  alt=""
                  src="/line-21.svg"
                />
              </div>
              <div className="flex flex-col items-start justify-end pt-0 px-0 pb-px">
                <button className="cursor-pointer [border:none] py-3 px-[9px] bg-red-200 rounded-3xs flex flex-row items-start justify-start z-[2] hover:bg-red-100">
                  <div className="h-[42px] w-[108px] relative rounded-3xs bg-red-200 hidden" />
                  <a className="[text-decoration:none] relative text-mini font-body-base text-background-default-default text-left inline-block min-w-[90px] z-[3]">
                    点击停止计费
                  </a>
                </button>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-[18px]">
              <h1 className="m-0 w-24 relative text-inherit font-normal font-inherit inline-block z-[2] mq450:text-lgi mq1050:text-7xl">
                台费：
              </h1>
              <div className="relative text-red-200 inline-block min-w-[120px] z-[2] mq450:text-lgi mq1050:text-7xl">
                ￥00.00
              </div>
            </div>
          </div>
          <img
            className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain mt-[-1px] z-[2]"
            loading="lazy"
            alt=""
            src="/line-31.svg"
          />
        </div>
        <div className="self-stretch flex flex-row items-start justify-between pt-0 px-0 pb-1.5 gap-[20px] mq450:flex-wrap">
          <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
            <h1 className="m-0 relative text-inherit font-normal font-inherit inline-block min-w-[128px] z-[2] mq450:text-lgi mq1050:text-7xl">
              已选商品
            </h1>
          </div>
          <div className="rounded-3xs bg-black-100 flex flex-row items-start justify-start pt-[9px] pb-2.5 pr-[7px] pl-[9px] gap-[9px] z-[2] text-mini text-background-default-default">
            <div className="h-[42px] w-[108px] relative rounded-3xs bg-black-100 hidden" />
            <img
              className="h-[23px] w-[23px] relative overflow-hidden shrink-0 min-h-[23px] z-[3]"
              loading="lazy"
              alt=""
              src="/plus-circle.svg"
            />
            <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
              <div className="relative inline-block min-w-[60px] z-[3]">
                添加商品
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch grid flex-row items-start justify-start gap-[51px] grid-cols-[repeat(3,_minmax(115px,_1fr))] text-smi mq450:grid-cols-[minmax(115px,_1fr)] mq750:gap-[25px] mq750:justify-center mq750:grid-cols-[repeat(2,_minmax(115px,_200px))]">
          <div className="h-[181px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-start pt-[7px] px-0 pb-2.5 box-border relative gap-[3px] z-[2]">
            <div className="self-stretch h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden z-[0]" />
            <img
              className="self-stretch flex-1 max-w-full overflow-hidden max-h-full object-cover z-[3]"
              alt=""
              src="/image@2x.png"
            />
            <div className="flex flex-row items-start justify-start py-0 px-1.5">
              <div className="relative inline-block min-w-[39px] z-[3]">
                商品名
              </div>
            </div>
            <div className="flex flex-row items-start justify-start py-0 px-1.5">
              <div className="relative inline-block min-w-[26px] z-[3]">
                价格
              </div>
            </div>
            <img
              className="w-8 h-8 absolute !m-[0] top-[-9px] right-[-16px] overflow-hidden shrink-0 z-[4]"
              alt=""
              src="/minus-circle-2.svg"
            />
          </div>
          <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 gap-[3px] z-[2]">
            <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
            <div className="relative inline-block min-w-[39px] max-w-[28%] z-[3]">
              商品名
            </div>
            <div className="relative inline-block min-w-[26px] max-w-[19%] z-[3]">
              价格
            </div>
          </div>
          <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 gap-[3px] z-[2]">
            <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden" />
            <div className="relative inline-block min-w-[39px] max-w-[28%] z-[3]">
              商品名
            </div>
            <div className="relative inline-block min-w-[26px] max-w-[19%] z-[3]">
              价格
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start gap-[47px] text-smi mq750:flex-wrap mq750:gap-[23px]">
          <div className="flex-1 flex flex-col items-start justify-start py-0 pr-2 pl-0 box-border min-w-[121px]">
            <FrameComponent minusCircle="/minus-circle-2.svg" />
          </div>
          <FrameComponent
            minusCircle="/minus-circle.svg"
            propAlignSelf="unset"
            propFlex="1"
            propMinWidth="115px"
          />
          <FrameComponent
            minusCircle="/minus-circle.svg"
            propAlignSelf="unset"
            propFlex="1"
            propMinWidth="115px"
          />
        </div>
      </div>
      <div className="w-[310px] flex flex-col items-start justify-start gap-[41px] mq450:gap-[20px]">
        <div className="flex flex-row items-start justify-start gap-[14px]">
          <h1 className="m-0 w-24 relative text-inherit font-normal font-inherit inline-block z-[2] mq450:text-lgi mq1050:text-7xl">
            共计：
          </h1>
          <div className="relative text-red-200 inline-block min-w-[120px] z-[2] mq450:text-lgi mq1050:text-7xl">
            ￥00.00
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-end text-background-default-default">
          <h1 className="m-0 relative text-inherit font-normal font-inherit inline-block min-w-[64px] z-[2] mq450:text-lgi mq1050:text-7xl">
            结账
          </h1>
        </div>
      </div>
    </div>
  );
};

FooterContent.propTypes = {
  className: PropTypes.string,
};

export default FooterContent;
