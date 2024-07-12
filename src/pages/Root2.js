import FrameComponent2 from "../components/FrameComponent2";
import ProductCarousel from "../components/ProductCarousel";
import ProductSummary from "../components/ProductSummary";

const Root2 = () => {
  return (
    <div className="w-full relative rounded-xl bg-background-default-default overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal] text-left text-29xl text-background-default-default font-body-base">
      <FrameComponent2 />
      <div className="w-[23px] relative hidden mq1050:text-19xl mq450:text-10xl">
        1
      </div>
      <main className="self-stretch bg-whitesmoke flex flex-row items-start justify-start pt-3.5 px-9 pb-[35px] box-border gap-[37px] max-w-full mq1150:flex-wrap mq750:gap-[18px] mq750:pb-5 mq750:box-border mq1050:pt-5 mq1050:pb-[23px] mq1050:box-border">
        <div className="h-[954px] w-[1440px] relative bg-whitesmoke hidden max-w-full" />
        <ProductCarousel />
        <ProductSummary />
      </main>
    </div>
  );
};

export default Root2;
