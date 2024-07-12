import PropTypes from "prop-types";

const MapContainer = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[32px] max-w-full text-left text-base text-lightslategray-200 font-rubik mq800:gap-[16px] ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-start py-2 pr-3 pl-6 relative gap-[46px] text-smi mq800:gap-[23px] mq1350:flex-wrap">
        <div className="h-full w-[1288px] absolute !m-[0] top-[0px] bottom-[0px] left-[0px] bg-gray-100 z-[3]" />
        <div className="w-[138px] flex flex-col items-start justify-start py-0 pr-[18px] pl-0 box-border">
          <div className="self-stretch relative tracking-[1.21px] uppercase z-[4]">
            会员名
          </div>
        </div>
        <div className="w-[138px] flex flex-col items-start justify-start py-0 pr-[18px] pl-0 box-border">
          <div className="self-stretch relative tracking-[1.21px] uppercase z-[4]">
            会员额度
          </div>
        </div>
        <div className="w-[166px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
          <div className="w-[136px] relative tracking-[1.21px] uppercase inline-block z-[4]">
            已消费
          </div>
        </div>
        <div className="w-[146px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
          <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block z-[4]">
            剩余额度
          </div>
        </div>
        <div className="w-[174px] flex flex-col items-start justify-start text-center">
          <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block z-[4]">
            会员类型
          </div>
        </div>
        <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block shrink-0 z-[4]">
          会员号
        </div>
        <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block shrink-0 z-[4]">
          创建时间
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[15px] max-w-full">
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-6 box-border max-w-full">
            <div className="flex-1 flex flex-row flex-wrap items-start justify-start gap-[16px] max-w-full">
              <div className="w-[168px] relative leading-[21px] text-darkslategray flex items-center shrink-0 z-[3]">
                MABSON
              </div>
              <div className="w-[168px] flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border">
                <div className="self-stretch relative leading-[21px] z-[3]">
                  2.00
                </div>
              </div>
              <div className="w-48 flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border text-darkslategray">
                <div className="w-[120px] relative leading-[21px] flex items-center z-[3]">
                  1.00
                </div>
              </div>
              <div className="w-[216px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
                <div className="w-[120px] relative leading-[21px] flex items-center z-[3]">
                  4.00
                </div>
              </div>
              <div className="w-[169px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
                <div className="w-[120px] relative leading-[24px] flex items-center z-[3]">
                  普通
                </div>
              </div>
              <div className="flex-1 flex flex-row items-start justify-start min-w-[193px] [row-gap:20px] mq450:flex-wrap">
                <div className="w-[105px] relative leading-[24px] flex items-center shrink-0 z-[3]">
                  456138
                </div>
                <div className="relative leading-[24px] whitespace-nowrap z-[4]">
                  2020 / 06 / 01/00:00:00
                </div>
              </div>
            </div>
          </div>
          <div className="w-[1288px] h-px relative bg-ghostwhite max-w-full z-[3]" />
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-2 pr-3 pl-6 relative gap-[46px] text-smi mq800:gap-[23px] mq1350:flex-wrap">
          <div className="h-full w-[1288px] absolute !m-[0] top-[0px] bottom-[0px] left-[0px] bg-gray-100 z-[3]" />
          <div className="w-[138px] flex flex-col items-start justify-start py-0 pr-[18px] pl-0 box-border">
            <div className="self-stretch relative tracking-[1.21px] uppercase z-[4]">
              会员名
            </div>
          </div>
          <div className="w-[138px] flex flex-col items-start justify-start py-0 pr-[18px] pl-0 box-border">
            <div className="self-stretch relative tracking-[1.21px] uppercase z-[4]">
              会员额度
            </div>
          </div>
          <div className="w-[166px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
            <div className="w-[136px] relative tracking-[1.21px] uppercase inline-block z-[4]">
              已消费
            </div>
          </div>
          <div className="w-[146px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
            <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block z-[4]">
              剩余额度
            </div>
          </div>
          <div className="w-[174px] flex flex-col items-start justify-start text-center">
            <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block z-[4]">
              商品成本
            </div>
          </div>
          <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block shrink-0 z-[4]">
            会员号
          </div>
          <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block shrink-0 z-[4]">
            消费时间
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[15px] max-w-full">
        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-6 box-border max-w-full">
          <div className="flex-1 flex flex-row flex-wrap items-start justify-start gap-[16px] max-w-full">
            <div className="w-[168px] relative leading-[21px] text-darkslategray flex items-center shrink-0 z-[3]">
              ZHANGSAN
            </div>
            <div className="w-[168px] flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border">
              <div className="self-stretch relative leading-[21px] z-[3]">
                2.00
              </div>
            </div>
            <div className="w-48 flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border text-darkslategray">
              <div className="w-[120px] relative leading-[21px] flex items-center z-[3]">
                1.00
              </div>
            </div>
            <div className="w-[216px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="w-[120px] relative leading-[21px] flex items-center z-[3]">
                4.00
              </div>
            </div>
            <div className="w-[169px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="w-[120px] relative leading-[21px] flex items-center z-[3]">
                尊贵
              </div>
            </div>
            <div className="flex-1 flex flex-row items-start justify-start min-w-[193px] [row-gap:20px] mq450:flex-wrap">
              <div className="w-[105px] relative leading-[24px] flex items-center shrink-0 z-[3]">
                1531214
              </div>
              <div className="relative leading-[24px] whitespace-nowrap z-[4]">
                2020 / 06 / 01/00:00:00
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1288px] h-px relative bg-ghostwhite max-w-full z-[3]" />
      </div>
    </div>
  );
};

MapContainer.propTypes = {
  className: PropTypes.string,
};

export default MapContainer;
