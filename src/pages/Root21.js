import Menu from "../components/Menu";
import MapContainer from "../components/MapContainer";

const Root2 = () => {
  return (
    <div className="w-full relative rounded-xl bg-background-default-default overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[61px] box-border leading-[normal] tracking-[normal] text-left text-13xl text-background-default-default font-body-base">
      <div className="relative hidden min-w-[64px] mq450:text-lgi mq800:text-7xl">
        结账
      </div>
      <Menu />
      <div className="w-[647px] h-[905px] relative rounded-xl bg-background-default-default hidden max-w-full" />
      <main className="self-stretch bg-whitesmoke flex flex-row items-start justify-start pt-3.5 px-9 pb-[35px] box-border max-w-full z-[1] mq800:pb-5 mq800:box-border mq1125:pt-5 mq1125:pb-[23px] mq1125:box-border">
        <div className="h-[954px] w-[1440px] relative bg-whitesmoke hidden max-w-full" />
        <section className="flex-1 rounded-xl bg-background-default-default flex flex-col items-start justify-start pt-[101px] pb-[30px] pr-1 pl-[50px] box-border gap-[504px] max-w-full z-[2] text-left text-base text-text-default-default font-body-base mq450:gap-[63px] mq450:pt-[43px] mq450:box-border mq800:gap-[126px] mq1125:pt-[66px] mq1125:pb-5 mq1125:box-border mq1350:gap-[252px] mq1350:pl-[25px] mq1350:box-border">
          <div className="w-[1368px] h-[905px] relative rounded-xl bg-background-default-default hidden max-w-full" />
          <MapContainer />
          <div className="w-[1208px] flex flex-row items-start justify-center max-w-full">
            <div className="w-[484px] flex flex-row flex-wrap items-center justify-start gap-[8px] max-w-full z-[3]">
              <div className="rounded-radius-200 flex flex-row items-center justify-center py-space-200 px-space-300 gap-[8px] opacity-[0.5] text-text-default-secondary">
                <img
                  className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px]"
                  loading="lazy"
                  alt=""
                  src="/arrow-left.svg"
                />
                <div className="relative leading-[100%] inline-block min-w-[48px]">
                  上一页
                </div>
              </div>
              <div className="flex-1 flex flex-row items-center justify-start gap-[8px] min-w-[270px]">
                <div className="rounded-radius-200 bg-background-brand-default flex flex-col items-center justify-center py-space-200 px-space-300 text-text-brand-on-brand">
                  <div className="relative leading-[100%] inline-block min-w-[8px]">
                    1
                  </div>
                </div>
                <div className="rounded-radius-200 flex flex-col items-center justify-center py-space-200 px-space-300">
                  <div className="relative leading-[100%] inline-block min-w-[10px]">
                    2
                  </div>
                </div>
                <div className="rounded-radius-200 flex flex-col items-center justify-center py-space-200 px-space-300">
                  <div className="relative leading-[100%] inline-block min-w-[11px]">
                    3
                  </div>
                </div>
                <div className="flex-[0.6522] rounded-lg flex flex-col items-center justify-center py-space-200 px-space-400 text-black-100">
                  <b className="relative leading-[140%] inline-block min-w-[15px]">
                    ...
                  </b>
                </div>
                <div className="flex-1 rounded-radius-200 flex flex-col items-center justify-center py-space-200 px-space-300">
                  <div className="relative leading-[100%] inline-block min-w-[20px]">
                    67
                  </div>
                </div>
                <div className="flex-1 rounded-radius-200 flex flex-col items-center justify-center py-space-200 px-space-300">
                  <div className="relative leading-[100%] inline-block min-w-[20px]">
                    68
                  </div>
                </div>
              </div>
              <div className="rounded-radius-200 flex flex-row items-center justify-center py-space-200 px-space-300 gap-[8px]">
                <div className="relative leading-[100%] inline-block min-w-[48px]">
                  下一页
                </div>
                <img
                  className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px]"
                  loading="lazy"
                  alt=""
                  src="/arrow-right.svg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Root2;
