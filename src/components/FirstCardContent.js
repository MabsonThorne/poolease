import PropTypes from "prop-types";

const FirstCardContent = ({ className = "" }) => {
  return (
    <div
      className={`flex flex-row items-start justify-end py-0 px-[18px] box-border max-w-full text-left text-smi text-rosybrown-200 font-rubik ${className}`}
    >
      <div className="w-[1277px] flex flex-row items-start justify-between max-w-full gap-[20px] mq1275:flex-wrap">
        <div className="w-[368px] flex flex-col items-start justify-start pt-4 px-0 pb-0 box-border min-w-[368px] max-w-full mq750:min-w-full mq1275:flex-1">
          <div className="self-stretch shadow-[0px_5px_10px_rgba(46,_91,_255,_0.2)] rounded bg-background-default-default box-border overflow-hidden flex flex-row items-start justify-start pt-6 px-6 pb-4 max-w-full z-[3] border-[1px] border-solid border-royalblue">
            <div className="h-[202px] w-[370px] relative shadow-[0px_5px_10px_rgba(46,_91,_255,_0.2)] rounded bg-background-default-default box-border hidden max-w-full z-[1] border-[1px] border-solid border-royalblue" />
            <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
              <div className="self-stretch relative tracking-[1.21px] uppercase z-[4]">
                title
              </div>
              <div className="w-44 flex flex-row items-end justify-between gap-[20px]">
                <img
                  className="h-32 w-32 relative z-[4]"
                  loading="lazy"
                  alt=""
                  src="/chartpie.svg"
                />
                <div className="flex flex-col items-start justify-end pt-0 px-0 pb-3">
                  <div className="w-2 h-14 relative">
                    <img
                      className="absolute top-[48px] left-[0px] w-2 h-2 mix-blend-normal z-[4]"
                      loading="lazy"
                      alt=""
                      src="/-color-label-3.svg"
                    />
                    <img
                      className="absolute top-[24px] left-[0px] w-2 h-2 z-[4]"
                      loading="lazy"
                      alt=""
                      src="/-color-label-2.svg"
                    />
                    <img
                      className="absolute top-[0px] left-[0px] w-2 h-2 z-[4]"
                      loading="lazy"
                      alt=""
                      src="/-color-label-1.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-48 flex flex-col items-end justify-start gap-[8px] ml-[-120px] text-right">
              <div className="w-[72px] flex flex-row items-start justify-start text-base text-limegreen">
                <img
                  className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px] z-[5]"
                  loading="lazy"
                  alt=""
                  src="/icic-arrow-up.svg"
                />
                <div className="flex-1 relative leading-[16px] inline-block min-w-[56px] z-[6]">
                  +14.2%
                </div>
              </div>
              <h1 className="m-0 self-stretch h-14 relative text-16xl leading-[42px] font-normal font-inherit text-darkslategray flex items-center shrink-0 z-[5] mq450:text-2xl mq450:leading-[25px] mq750:text-9xl mq750:leading-[34px]">
                xx %
              </h1>
              <div className="w-[136px] flex flex-row items-start justify-start text-left">
                <div className="w-16 flex flex-col items-start justify-start gap-[8px]">
                  <div className="self-stretch relative z-[5]">Label 1:</div>
                  <div className="self-stretch relative z-[5]">Label 2:</div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-[8px] ml-[-16px] text-right text-xs text-darkslategray">
                  <div className="self-stretch relative font-medium z-[4]">
                    xx %
                  </div>
                  <div className="self-stretch relative font-medium z-[4]">
                    xx %
                  </div>
                </div>
              </div>
              <div className="w-[136px] flex flex-row items-start justify-start text-left">
                <div className="flex-1 relative shrink-0 z-[5]">Label 3:</div>
                <div className="w-[72px] flex flex-col items-start justify-start py-0 px-0 box-border text-right text-xs text-darkslategray">
                  <div className="ml-[-16px] w-[88px] relative font-medium flex items-center shrink-0 z-[4]">
                    xx %
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[754px] shadow-[0px_5px_10px_rgba(46,_91,_255,_0.2)] rounded bg-background-default-default box-border overflow-hidden shrink-0 flex flex-col items-end justify-start pt-6 px-6 pb-[13px] gap-[8px] min-w-[754px] max-w-full z-[3] text-lightslategray-200 border-[1px] border-solid border-royalblue mq1100:min-w-full mq1275:flex-1">
          <div className="w-[754px] h-[202px] relative shadow-[0px_5px_10px_rgba(46,_91,_255,_0.2)] rounded bg-background-default-default box-border hidden max-w-full border-[1px] border-solid border-royalblue" />
          <div className="self-stretch flex flex-row items-start justify-between gap-[20px] mq750:flex-wrap">
            <div className="w-[280px] relative tracking-[1.21px] uppercase inline-block shrink-0 z-[4]">
              title
            </div>
            <div className="w-[72px] flex flex-row items-start justify-start text-right text-base text-limegreen">
              <img
                className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px] z-[4]"
                alt=""
                src="/icic-arrow-up.svg"
              />
              <div className="flex-1 relative leading-[16px] inline-block min-w-[56px] z-[5]">
                +14.2%
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start gap-[42px] max-w-full text-right text-xs text-rosybrown-100 mq750:flex-wrap mq750:gap-[21px]">
            <div className="flex-1 flex flex-row items-start justify-start gap-[10px] min-w-[304px] max-w-full mq750:flex-wrap">
              <div className="overflow-hidden flex flex-col items-start justify-start py-0 pr-0 pl-[3px] gap-[14.5px] z-[4]">
                <div className="ml-[-4px] w-[21px] relative tracking-[-0.13px] inline-block min-w-[21px]">
                  100
                </div>
                <div className="flex flex-row items-start justify-start py-0 pr-0.5 pl-px">
                  <div className="relative tracking-[-0.13px] inline-block min-w-[14px]">
                    75
                  </div>
                </div>
                <div className="relative tracking-[-0.13px] inline-block min-w-[15px]">
                  50
                </div>
                <div className="w-[15px] relative tracking-[-0.13px] inline-block min-w-[15px]">
                  25
                </div>
                <div className="flex flex-row items-start justify-start py-0 pr-0.5 pl-[7px]">
                  <div className="relative tracking-[-0.13px] inline-block min-w-[8px]">
                    0
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-end justify-start gap-[4px] min-w-[285px] max-w-full text-left">
                <div className="self-stretch h-[120px] relative">
                  <img
                    className="absolute top-[0px] left-[0px] w-full h-full overflow-hidden z-[4]"
                    alt=""
                    src="/imgimg-grid-big.svg"
                  />
                  <img
                    className="absolute top-[8px] left-[3px] w-[435px] h-28 overflow-hidden z-[5]"
                    loading="lazy"
                    alt=""
                    src="/chart-figure.svg"
                  />
                </div>
                <div className="self-stretch flex flex-row items-start justify-start gap-[16px] mq750:flex-wrap">
                  <div className="flex flex-col items-start justify-start py-0 pr-2.5 pl-0">
                    <div className="relative tracking-[-0.13px] inline-block min-w-[8px] z-[4]">
                      1
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pr-[7px] pl-0">
                    <div className="relative tracking-[-0.13px] inline-block min-w-[11px] z-[4]">
                      2
                    </div>
                  </div>
                  <div className="flex-[0.5909] flex flex-col items-start justify-start py-0 pr-[9px] pl-0 box-border min-w-[16px] mq450:flex-1">
                    <div className="self-stretch relative tracking-[-0.13px] z-[4]">
                      3
                    </div>
                  </div>
                  <div className="flex-[0.52] flex flex-col items-start justify-start py-0 pr-3 pl-0 box-border min-w-[16px] mq450:flex-1">
                    <div className="self-stretch relative tracking-[-0.13px] z-[4]">
                      4
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pr-3.5 pl-0">
                    <div className="relative tracking-[-0.13px] inline-block min-w-[11px] z-[4]">
                      5
                    </div>
                  </div>
                  <div className="flex-[0.7222] flex flex-col items-start justify-start py-0 pr-[5px] pl-0 box-border min-w-[16px] mq450:flex-1">
                    <div className="self-stretch relative tracking-[-0.13px] z-[4]">
                      6
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pr-[13px] pl-0">
                    <div className="relative tracking-[-0.13px] inline-block min-w-[10px] z-[4]">
                      7
                    </div>
                  </div>
                  <div className="flex-[0.5652] flex flex-col items-start justify-start py-0 pr-2.5 pl-0 box-border min-w-[16px] mq450:flex-1">
                    <div className="self-stretch relative tracking-[-0.13px] z-[4]">
                      8
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pr-[11px] pl-0">
                    <div className="relative tracking-[-0.13px] inline-block min-w-[11px] z-[4]">
                      9
                    </div>
                  </div>
                  <div className="flex-1 relative tracking-[-0.13px] inline-block min-w-[16px] z-[4]">
                    10
                  </div>
                  <div className="flex-[0.8] flex flex-col items-start justify-start py-0 pr-1 pl-0 box-border min-w-[16px] mq450:flex-1">
                    <div className="self-stretch relative tracking-[-0.13px] z-[4]">
                      11
                    </div>
                  </div>
                  <div className="relative tracking-[-0.13px] z-[4]">
                    <p className="m-0">12</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-32 w-48 relative min-w-[192px] text-16xl text-darkslategray mq750:flex-1">
              <div className="absolute top-[92px] left-[16px] w-2 h-8">
                <img
                  className="absolute top-[24px] left-[0px] w-2 h-2 z-[4]"
                  alt=""
                  src="/-color-label-2-1.svg"
                />
                <img
                  className="absolute top-[0px] left-[0px] w-2 h-2 z-[4]"
                  alt=""
                  src="/-color-label-1.svg"
                />
              </div>
              <div className="absolute top-[0px] left-[0px] w-full flex flex-col items-end justify-start gap-[46px] h-full">
                <h1 className="m-0 self-stretch relative text-inherit leading-[42px] font-normal font-inherit z-[4] mq450:text-2xl mq450:leading-[25px] mq750:text-9xl mq750:leading-[34px]">
                  xx #
                </h1>
                <div className="w-40 flex flex-row items-start justify-start gap-[8px] text-left text-smi text-lightslategray-200">
                  <div className="w-16 flex flex-col items-start justify-start gap-[8px]">
                    <div className="self-stretch relative z-[4]">Label 1:</div>
                    <div className="self-stretch relative z-[4]">Label 2:</div>
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-start gap-[8px] text-right text-xs text-darkslategray">
                    <div className="self-stretch relative font-medium z-[4]">
                      xx #
                    </div>
                    <div className="self-stretch relative font-medium z-[4]">
                      xx #
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FirstCardContent.propTypes = {
  className: PropTypes.string,
};

export default FirstCardContent;
