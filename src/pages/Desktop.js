import ProductItem from "../components/ProductItem";
import Container from "../components/Container";

const Desktop = () => {
  return (
    <div className="w-full relative rounded-xl bg-background-default-default overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal] text-left text-13xl text-background-default-default font-body-base">
      <div className="relative hidden min-w-[64px] mq450:text-lgi mq1050:text-7xl">
        结账
      </div>
      <ProductItem />
      <div className="w-[647px] h-[905px] relative rounded-xl bg-background-default-default hidden max-w-full" />
      <main className="self-stretch bg-whitesmoke flex flex-row items-start justify-start pt-3.5 px-9 pb-[35px] box-border gap-[37px] max-w-full z-[1] text-left text-base text-text-default-secondary font-body-base mq1150:flex-wrap mq750:gap-[18px] mq750:pb-5 mq750:box-border mq1050:pt-5 mq1050:pb-[23px] mq1050:box-border">
        <div className="h-[954px] w-[1440px] relative bg-whitesmoke hidden max-w-full" />
        <Container />
        <div className="flex-1 rounded-xl bg-background-default-default flex flex-row items-start justify-start py-[38px] px-[35px] box-border min-w-[442px] max-w-full z-[2] mq450:pt-5 mq450:pb-5 mq450:box-border mq750:min-w-full mq1050:pt-[25px] mq1050:pb-[25px] mq1050:box-border">
          <div className="h-[905px] w-[680px] relative rounded-xl bg-background-default-default hidden max-w-full" />
          <div className="flex-1 flex flex-col items-start justify-start pt-space-1600 px-space-1600 pb-[124px] box-border gap-[24px] min-w-[240px] max-w-full z-[3] mq450:pt-[27px] mq450:pb-[53px] mq450:box-border mq750:pl-8 mq750:pr-8 mq750:box-border mq1050:pt-[42px] mq1050:pb-[81px] mq1050:box-border">
            <div className="self-stretch flex flex-row items-start justify-start max-w-full mq750:gap-[32px]">
              <img
                className="h-[369px] flex-1 max-w-full overflow-hidden object-cover"
                loading="lazy"
                alt=""
                src="/image1@2x.png"
              />
            </div>
            <div className="self-stretch h-[237px] flex flex-col items-start justify-center py-0 px-0 box-border gap-[24px] max-w-full">
              <div className="self-stretch h-[22px] shrink-0" />
              <div className="w-[504px] h-[] max-w-[107%] shrink-0" />
              <div className="self-stretch h-[22px] shrink-0" />
              <div className="self-stretch flex flex-col items-start justify-start text-5xl text-black-100">
                <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                  <div className="self-stretch flex flex-row items-start justify-start">
                    <h3 className="m-0 relative text-inherit tracking-[-0.02em] leading-[29px] font-semibold font-inherit inline-block min-w-[48px] mq450:text-lgi mq450:leading-[23px]">
                      可乐
                    </h3>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-center py-0 pr-[236px] pl-0 gap-[4px] text-base text-text-positive-on-positive-secondary mq750:pr-[118px] mq750:box-border">
                    <div className="rounded-radius-200 bg-background-positive-secondary flex flex-row items-center justify-center p-2">
                      <div className="relative leading-[100%] inline-block min-w-[32px]">
                        饮料
                      </div>
                    </div>
                    <div className="self-stretch flex flex-row items-baseline justify-start gap-[8px] text-29xl text-text-default-default">
                      <div className="flex-1 flex flex-row items-center justify-start">
                        <b className="relative tracking-[-0.02em] leading-[58px] mq450:text-10xl mq450:leading-[35px] mq1050:text-19xl mq1050:leading-[46px]">
                          价格：1.00
                        </b>
                      </div>
                      <div className="w-[52px] relative text-sm leading-[140%] hidden">
                        / month
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative leading-[140%] inline-block min-w-[88px]">
                库存数量：1
              </div>
              <div className="w-full flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border max-w-[640px] mq750:max-w-full">
                <div className="relative leading-[140%] inline-block min-w-[82px]">
                  进价：2.00
                </div>
              </div>
              <button className="cursor-pointer py-2.5 px-5 bg-background-brand-default self-stretch rounded-radius-200 overflow-hidden flex flex-row items-center justify-center gap-[8px] border-[1px] border-solid border-background-brand-default">
                <img
                  className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
                  alt=""
                  src="/star4.svg"
                />
                <div className="relative text-base leading-[100%] font-body-base text-text-brand-on-brand text-left inline-block min-w-[32px]">
                  编辑
                </div>
                <img
                  className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
                  alt=""
                  src="/x5.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Desktop;
