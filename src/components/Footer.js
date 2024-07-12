import PropTypes from "prop-types";

const Footer = ({ className = "" }) => {
  return (
    <div
      className={`w-[647px] rounded-xl bg-background-default-default flex flex-col items-end justify-start pt-12 px-[38px] pb-[77px] box-border gap-[63px] min-w-[647px] max-w-full z-[1] text-left text-13xl text-black-100 font-body-base mq450:gap-[16px] mq450:pt-5 mq450:pb-8 mq450:box-border mq1150:flex-1 mq750:gap-[31px] mq1050:pt-[31px] mq1050:pb-[50px] mq1050:box-border mq1050:min-w-full ${className}`}
    >
      <div className="w-[647px] h-[905px] relative rounded-xl bg-background-default-default hidden max-w-full" />
      <div className="self-stretch flex flex-col items-end justify-start gap-[34px] max-w-full mq750:gap-[17px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[12px] max-w-full">
          <div className="w-[336px] flex flex-row items-start justify-start py-0 px-2 box-border max-w-full">
            <div className="h-[39px] flex-1 relative leading-[39.2px] inline-block z-[2] mq450:text-base">
              <span>请选择台号</span>
              <span className="text-xl">（左滑选择更多）</span>
            </div>
          </div>
          <img
            className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain mt-[-1px] z-[2]"
            alt=""
            src="/separator.svg"
          />
        </div>
        <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[45px] pl-[46px] box-border max-w-full text-29xl text-background-default-default mq750:pl-[23px] mq750:pr-[22px] mq750:box-border">
          <div className="flex-1 flex flex-row items-start justify-start gap-[49px] max-w-full mq750:flex-wrap mq750:gap-[24px]">
            <div className="flex-[0.7188] rounded-3xs bg-black-100 flex flex-row items-start justify-start py-[34px] pr-[51px] pl-[52px] box-border min-w-[31px] z-[2] mq450:flex-1">
              <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
              <div className="flex-1 relative z-[3] mq450:text-10xl mq1050:text-19xl">
                1
              </div>
            </div>
            <div className="flex-[0.9375] rounded-3xs bg-black-100 flex flex-row items-start justify-start py-[34px] px-12 box-border min-w-[31px] z-[2] mq450:flex-1">
              <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
              <div className="flex-1 relative z-[3] mq450:text-10xl mq1050:text-19xl">
                2
              </div>
            </div>
            <div className="flex-1 rounded-3xs bg-black-100 flex flex-row items-start justify-start py-[34px] px-[47px] box-border min-w-[31px] z-[2]">
              <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
              <div className="flex-1 relative z-[3] mq450:text-10xl mq1050:text-19xl">
                3
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start justify-end py-0 pr-[45px] pl-[50px] box-border max-w-full text-29xl text-background-default-default mq750:pl-[25px] mq750:pr-[22px] mq750:box-border">
        <div className="w-[476px] flex flex-row flex-wrap items-start justify-start gap-[63px_47px] min-h-[504px] max-w-full mq750:gap-[23px]">
          <div className="w-[126px] rounded-3xs bg-black-100 flex flex-row items-start justify-end py-[34px] px-[43px] box-border z-[2]">
            <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
            <div className="relative inline-block min-w-[31px] z-[3] mq450:text-10xl mq1050:text-19xl">
              4
            </div>
          </div>
          <div className="w-[126px] rounded-3xs bg-black-100 flex flex-row items-start justify-start py-[34px] px-12 box-border z-[2]">
            <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
            <div className="flex-1 relative z-[3] mq450:text-10xl mq1050:text-19xl">
              5
            </div>
          </div>
          <div className="w-[126px] rounded-3xs bg-black-100 flex flex-row items-start justify-start py-[34px] px-[47px] box-border z-[2]">
            <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
            <div className="flex-1 relative z-[3] mq450:text-10xl mq1050:text-19xl">
              6
            </div>
          </div>
          <div className="rounded-3xs bg-black-100 flex flex-row items-start justify-start py-[34px] pr-[46px] pl-[52px] z-[2]">
            <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
            <div className="relative inline-block min-w-[28px] z-[3] mq450:text-10xl mq1050:text-19xl">
              7
            </div>
          </div>
          <div className="w-[126px] rounded-3xs bg-black-100 flex flex-row items-start justify-start py-[34px] px-12 box-border z-[2]">
            <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
            <div className="flex-1 relative z-[3] mq450:text-10xl mq1050:text-19xl">
              8
            </div>
          </div>
          <div className="w-[126px] rounded-3xs bg-black-100 flex flex-row items-start justify-start py-[34px] px-[47px] box-border z-[2]">
            <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
            <div className="flex-1 relative z-[3] mq450:text-10xl mq1050:text-19xl">
              9
            </div>
          </div>
          <div className="w-[126px] rounded-3xs bg-black-100 flex flex-row items-start justify-start py-[34px] pr-[34px] pl-[39px] box-border z-[2]">
            <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
            <div className="flex-1 relative z-[3] mq450:text-10xl mq1050:text-19xl">
              10
            </div>
          </div>
          <div className="w-[126px] rounded-3xs bg-black-100 flex flex-row items-start justify-start py-[34px] px-[35px] box-border z-[2]">
            <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
            <div className="w-[45px] relative inline-block z-[3] mq450:text-10xl mq1050:text-19xl">
              11
            </div>
          </div>
          <div className="w-[126px] rounded-3xs bg-black-100 flex flex-row items-start justify-start p-[34px] box-border z-[2]">
            <div className="h-[126px] w-[126px] relative rounded-3xs bg-black-100 hidden" />
            <div className="w-[52px] relative inline-block z-[3] mq450:text-10xl mq1050:text-19xl">
              12
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
