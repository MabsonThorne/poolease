import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[32px] max-w-full text-left text-base text-lightslategray-200 font-rubik mq800:gap-[16px] ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-start py-2 pr-3 pl-6 relative gap-[46px] text-smi mq800:gap-[23px] mq1350:flex-wrap">
        <div className="h-full w-[1288px] absolute !m-[0] top-[0px] bottom-[0px] left-[0px] bg-gray-100 z-[3]" />
        <div className="w-[138px] flex flex-col items-start justify-start py-0 pr-[18px] pl-0 box-border">
          <div className="self-stretch relative tracking-[1.21px] uppercase z-[4]">
            台球消费
          </div>
        </div>
        <div className="w-[138px] flex flex-col items-start justify-start py-0 pr-[18px] pl-0 box-border">
          <div className="self-stretch relative tracking-[1.21px] uppercase z-[4]">
            麻将消费
          </div>
        </div>
        <div className="w-[166px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
          <div className="w-[136px] relative tracking-[1.21px] uppercase inline-block z-[4]">
            商品消费
          </div>
        </div>
        <div className="w-[146px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
          <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block z-[4]">
            总消费
          </div>
        </div>
        <div className="w-[174px] flex flex-col items-start justify-start text-center">
          <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block z-[4]">
            商品成本
          </div>
        </div>
        <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block shrink-0 z-[4]">
          利润
        </div>
        <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block shrink-0 z-[4]">
          消费时间
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[15px] max-w-full">
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-6 box-border max-w-full">
            <div className="flex-1 flex flex-row flex-wrap items-start justify-start max-w-full [row-gap:20px]">
              <div className="w-[184px] flex flex-col items-start justify-start py-0 pr-4 pl-0 box-border text-darkslategray">
                <div className="self-stretch relative leading-[21px] z-[3]">
                  1.00
                </div>
              </div>
              <div className="w-[184px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
                <div className="self-stretch relative leading-[21px] z-[3]">
                  2.00
                </div>
              </div>
              <div className="w-52 flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border text-darkslategray">
                <div className="w-[120px] relative leading-[21px] flex items-center z-[3]">
                  1.00
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border min-w-[151px]">
                <div className="w-[120px] relative leading-[21px] flex items-center z-[3]">
                  4.00
                </div>
              </div>
              <div className="w-[185px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
                <div className="w-[120px] relative leading-[21px] flex items-center z-[3]">
                  4.00
                </div>
              </div>
              <div className="w-[105px] relative leading-[24px] flex items-center shrink-0 z-[3]">
                4.00
              </div>
              <div className="relative leading-[24px] whitespace-nowrap z-[4]">
                2020 / 06 / 01/00:00:00
              </div>
            </div>
          </div>
          <div className="w-[1288px] h-px relative bg-ghostwhite max-w-full z-[3]" />
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-2 pr-3 pl-6 relative gap-[46px] text-smi mq800:gap-[23px] mq1350:flex-wrap">
          <div className="h-full w-[1288px] absolute !m-[0] top-[0px] bottom-[0px] left-[0px] bg-gray-100 z-[3]" />
          <div className="w-[138px] flex flex-col items-start justify-start py-0 pr-[18px] pl-0 box-border">
            <div className="self-stretch relative tracking-[1.21px] uppercase z-[4]">
              台球消费
            </div>
          </div>
          <div className="w-[138px] flex flex-col items-start justify-start py-0 pr-[18px] pl-0 box-border">
            <div className="self-stretch relative tracking-[1.21px] uppercase z-[4]">
              麻将消费
            </div>
          </div>
          <div className="w-[166px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
            <div className="w-[136px] relative tracking-[1.21px] uppercase inline-block z-[4]">
              商品消费
            </div>
          </div>
          <div className="w-[146px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
            <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block z-[4]">
              总消费
            </div>
          </div>
          <div className="w-[174px] flex flex-col items-start justify-start text-center">
            <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block z-[4]">
              商品成本
            </div>
          </div>
          <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block shrink-0 z-[4]">
            利润
          </div>
          <div className="w-[120px] relative tracking-[1.21px] uppercase inline-block shrink-0 z-[4]">
            消费时间
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[15px] max-w-full">
        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-6 box-border max-w-full">
          <div className="flex-1 flex flex-row flex-wrap items-start justify-start max-w-full [row-gap:20px]">
            <div className="w-[184px] flex flex-col items-start justify-start py-0 pr-4 pl-0 box-border text-darkslategray">
              <div className="self-stretch relative leading-[21px] z-[3]">
                1.00
              </div>
            </div>
            <div className="w-[184px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="self-stretch relative leading-[21px] z-[3]">
                2.00
              </div>
            </div>
            <div className="w-52 flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border text-darkslategray">
              <div className="w-[120px] relative leading-[21px] flex items-center z-[3]">
                1.00
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border min-w-[151px]">
              <div className="w-[120px] relative leading-[21px] flex items-center z-[3]">
                4.00
              </div>
            </div>
            <div className="w-[185px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="w-[120px] relative leading-[21px] flex items-center z-[3]">
                4.00
              </div>
            </div>
            <div className="w-[105px] relative leading-[24px] flex items-center shrink-0 z-[3]">
              4.00
            </div>
            <div className="relative leading-[24px] whitespace-nowrap z-[4]">
              2020 / 06 / 01/00:00:00
            </div>
          </div>
        </div>
        <div className="w-[1288px] h-px relative bg-ghostwhite max-w-full z-[3]" />
      </div>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
