import PropTypes from "prop-types";

const CardThreeContainer = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-end justify-start gap-[71px] max-w-full text-right text-xs text-black-100 font-rubik mq450:gap-[18px] mq750:gap-[35px] mq1275:flex-wrap ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-[34px] box-border min-w-[489px] max-w-full mq750:min-w-full">
        <div className="self-stretch box-border flex flex-row items-start justify-start max-w-full z-[3] border-[1px] border-solid border-black-100">
          <div className="flex-1 shadow-[0px_5px_10px_rgba(46,_91,_255,_0.2)] rounded bg-background-default-default box-border overflow-hidden flex flex-col items-end justify-start p-6 gap-[6.5px] max-w-full border-[1px] border-solid border-royalblue">
            <div className="w-[754px] h-[202px] relative shadow-[0px_5px_10px_rgba(46,_91,_255,_0.2)] rounded bg-background-default-default box-border hidden max-w-full border-[1px] border-solid border-royalblue" />
            <div className="self-stretch flex flex-row items-start justify-between gap-[20px] text-left text-smi text-lightslategray-200 mq750:flex-wrap">
              <div className="w-[280px] relative tracking-[1.21px] uppercase inline-block shrink-0 z-[1]">
                消费时段
              </div>
              <div className="w-[72px] flex flex-row items-start justify-start text-right text-base text-limegreen">
                <img
                  className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px] z-[1]"
                  alt=""
                  src="/icic-arrow-up.svg"
                />
                <div className="flex-1 relative leading-[16px] inline-block min-w-[56px] z-[2]">
                  +14.2%
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[48px] max-w-full mq750:flex-wrap mq750:gap-[24px]">
              <div className="flex-1 flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border min-w-[302px] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-start gap-[16.5px] max-w-full mq750:flex-wrap">
                  <div className="w-[11px] flex flex-col items-start justify-start gap-[13px]">
                    <div className="self-stretch relative tracking-[-0.13px] z-[1]">
                      1
                    </div>
                    <div className="self-stretch relative tracking-[-0.13px] inline-block min-w-[11px] z-[1]">
                      2
                    </div>
                    <div className="self-stretch relative tracking-[-0.13px] inline-block min-w-[11px] z-[1]">
                      3
                    </div>
                    <div className="self-stretch relative tracking-[-0.13px] inline-block min-w-[11px] z-[1]">
                      4
                    </div>
                  </div>
                  <div className="h-[97px] flex-1 relative min-w-[283px] max-w-full">
                    <img
                      className="absolute top-[4px] left-[0px] w-[435.2px] h-[93px] z-[1]"
                      alt=""
                      src="/group-11.svg"
                    />
                    <img
                      className="absolute top-[0px] left-[0.5px] w-full h-full z-[2]"
                      alt=""
                      src="/path-10.svg"
                    />
                    <img
                      className="absolute top-[1px] left-[0.5px] w-[436px] h-[65px] z-[3]"
                      alt=""
                      src="/path-10-1.svg"
                    />
                  </div>
                </div>
              </div>
              <h1 className="m-0 w-48 relative text-16xl leading-[42px] font-normal font-inherit text-darkslategray flex items-center shrink-0 z-[1] mq450:text-2xl mq450:leading-[25px] mq750:text-9xl mq750:leading-[34px]">
                xx #
              </h1>
            </div>
            <div className="w-[685px] flex flex-row items-start justify-start gap-[8px] max-w-full mq750:flex-wrap">
              <div className="w-[53.5px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border">
                <div className="w-[11.7px] relative tracking-[-0.13px] inline-block min-w-[11.7px] z-[1]">
                  0
                </div>
              </div>
              <div className="w-[78.3px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border">
                <div className="w-[34.5px] relative tracking-[-0.13px] inline-block z-[1]">
                  100
                </div>
              </div>
              <div className="w-[77.6px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border">
                <div className="w-[34.5px] relative tracking-[-0.13px] inline-block z-[1]">
                  200
                </div>
              </div>
              <div className="w-[78.3px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border">
                <div className="w-[34.5px] relative tracking-[-0.13px] inline-block z-[1]">
                  300
                </div>
              </div>
              <div className="w-[77.6px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border">
                <div className="w-[34.5px] relative tracking-[-0.13px] inline-block z-[1]">
                  400
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border min-w-[62px]">
                <div className="w-[34.5px] relative tracking-[-0.13px] inline-block z-[1]">
                  500
                </div>
              </div>
              <div className="w-20 flex flex-row items-start justify-start gap-[8px] text-left text-smi text-lightslategray-200">
                <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                  <img
                    className="w-2 h-2 relative z-[1]"
                    alt=""
                    src="/-color-label-1-2.svg"
                  />
                </div>
                <div className="flex-1 relative z-[1]">Label 1:</div>
              </div>
              <div className="flex-1 relative font-medium text-darkslategray inline-block min-w-[57px] z-[1]">
                xx #
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[509px] shadow-[0px_5px_10px_rgba(46,_91,_255,_0.2)] rounded bg-background-default-default box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-6 pb-[68.4px] pr-0 pl-[22px] gap-[53.4px] min-w-[509px] max-w-full z-[3] text-left text-smi text-lightslategray-200 border-[1px] border-solid border-royalblue mq750:gap-[27px] mq750:min-w-full mq1275:flex-1">
        <div className="w-[509px] h-[294px] relative shadow-[0px_5px_10px_rgba(46,_91,_255,_0.2)] rounded bg-background-default-default box-border hidden max-w-full border-[1px] border-solid border-royalblue" />
        <div className="w-[463px] flex flex-row items-start justify-start py-0 px-0.5 box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-start max-w-full [row-gap:20px] mq750:flex-wrap mq1275:flex-1">
            <div className="flex-1 flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border min-w-[252px] max-w-full">
              <div className="w-[280px] relative tracking-[1.21px] uppercase inline-block z-[4]">
                盈利表
              </div>
            </div>
            <img
              className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px] z-[4]"
              alt=""
              src="/icic-arrow-up-3.svg"
            />
            <div className="w-14 relative text-base leading-[16px] text-crimson text-right flex items-center shrink-0 z-[5]">
              -14.2%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-end justify-start gap-[4.7px] text-xs text-lightslategray-100 mq750:flex-wrap">
          <div className="w-[34.5px] flex flex-col items-start justify-end pt-0 px-0 pb-[17.8px] box-border text-right">
            <div className="self-stretch flex flex-col items-end justify-start gap-[11px]">
              <div className="self-stretch relative tracking-[-0.13px] z-[4]">
                300
              </div>
              <div className="self-stretch relative tracking-[-0.13px] z-[4]">
                200
              </div>
              <div className="w-[33.1px] relative tracking-[-0.13px] inline-block z-[4]">
                100
              </div>
              <div className="w-[12.4px] relative tracking-[-0.13px] inline-block z-[4]">
                0
              </div>
            </div>
          </div>
          <div className="h-[130.2px] flex-1 relative min-w-[190px]">
            <div className="absolute top-[0px] left-[0px] w-full flex flex-row items-end justify-start pt-[25.1px] px-1.5 pb-0 box-border gap-[55.1px] h-full mq450:gap-[28px]">
              <img
                className="h-full w-full absolute !m-[0] top-[0px] right-[0px] left-[0px] max-w-full overflow-hidden z-[4]"
                alt=""
                src="/group-11-1.svg"
              />
              <div className="h-[110.1px] w-[26.2px] absolute !m-[0] bottom-[-1.6px] left-[9.7px] rounded-10xs bg-indianred z-[5]" />
              <div className="h-[138.5px] w-[26.2px] absolute !m-[0] top-[-6.6px] left-[53.8px] rounded-10xs bg-gold z-[5]" />
              <div className="w-[121.3px] flex flex-row items-start justify-start gap-[22.8px]">
                <div className="flex flex-col items-start justify-start pt-[67.6px] px-0 pb-0">
                  <div className="relative tracking-[-0.13px] inline-block min-w-[24px] z-[6]">
                    Mon
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-[67.6px] px-0 pb-0">
                  <div className="relative tracking-[-0.13px] inline-block min-w-[20px] z-[6]">
                    Tue
                  </div>
                </div>
                <div className="h-[81.8px] flex-1 relative">
                  <div className="absolute top-[0px] left-[1.4px] rounded-10xs bg-indianred w-[26.2px] h-[81.8px] z-[5]" />
                  <div className="absolute top-[67.6px] left-[0px] tracking-[-0.13px] inline-block w-[31.7px] z-[6]">
                    Wed
                  </div>
                </div>
              </div>
              <div className="w-[75.8px] flex flex-row items-end justify-start gap-[17.9px]">
                <div className="flex-[0.771] rounded-10xs bg-indianred flex flex-row items-start justify-start pt-[89.3px] pb-[0.2px] pr-0.5 pl-1 z-[5]">
                  <div className="h-[103.5px] w-[26.2px] relative rounded-10xs bg-indianred hidden" />
                  <div className="w-[19.3px] relative tracking-[-0.13px] inline-block shrink-0 z-[6]">
                    Fri
                  </div>
                </div>
                <div className="h-[81.8px] flex-1 relative">
                  <div className="absolute top-[0px] left-[0px] rounded-10xs bg-silver-100 w-[26.2px] h-[81.8px] z-[5]" />
                  <div className="absolute top-[67.6px] left-[0px] tracking-[-0.13px] inline-block w-[31.7px] z-[6]">
                    Sat
                  </div>
                </div>
              </div>
              <div className="h-[113.5px] w-[35.8px] absolute !m-[0] right-[-13.8px] bottom-[-1.6px]">
                <div className="absolute top-[0px] left-[0px] rounded-10xs bg-silver-100 w-[26.2px] h-[113.5px] z-[5]" />
                <div className="absolute top-[97.7px] left-[4.1px] tracking-[-0.13px] inline-block w-[31.7px] z-[6]">
                  Sun
                </div>
              </div>
            </div>
            <div className="absolute top-[20.1px] left-[140.6px] w-[31.7px] h-[110.1px]">
              <div className="absolute top-[0px] left-[0px] rounded-10xs bg-indianred w-[26.2px] h-[110.1px] z-[5]" />
              <div className="absolute top-[94.3px] left-[0px] tracking-[-0.13px] inline-block w-[31.7px] z-[6]">
                Thu
              </div>
            </div>
          </div>
          <div className="w-[149px] flex flex-col items-start justify-end pt-0 px-0 pb-[21.6px] box-border text-smi text-lightslategray-200">
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
              <div className="w-[138px] flex flex-row items-start justify-between gap-[20px]">
                <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                  <img
                    className="w-2 h-2 relative shrink-0 z-[4]"
                    alt=""
                    src="/-color-label-2-1.svg"
                  />
                </div>
                <div className="w-[77.2px] relative inline-block shrink-0 z-[4]">
                  Label 1
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                  <img
                    className="w-2 h-2 relative shrink-0 z-[4]"
                    alt=""
                    src="/-color-label-2-2.svg"
                  />
                </div>
                <div className="w-[88.2px] relative inline-block shrink-0 z-[4]">
                  Label 2
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                  <img
                    className="w-2 h-2 relative shrink-0 z-[4]"
                    alt=""
                    src="/-color-label-3-1.svg"
                  />
                </div>
                <div className="w-[88.2px] relative inline-block shrink-0 z-[4]">
                  Label 3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardThreeContainer.propTypes = {
  className: PropTypes.string,
};

export default CardThreeContainer;
