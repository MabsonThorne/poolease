import Staff from "../components/Staff";
import FirstCardContent from "../components/FirstCardContent";
import CardThreeContainer from "../components/CardThreeContainer";

const Root1 = () => {
  return (
    <div className="w-full relative rounded-xl bg-background-default-default overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal] text-left text-13xl text-background-default-default font-body-base">
      <div className="relative hidden min-w-[64px] mq450:text-lgi mq750:text-7xl">
        结账
      </div>
      <Staff />
      <div className="w-[647px] h-[905px] relative rounded-xl bg-background-default-default hidden max-w-full" />
      <main className="self-stretch bg-whitesmoke flex flex-row items-start justify-start pt-3.5 px-9 pb-[35px] box-border max-w-full z-[1] mq750:pb-5 mq750:box-border mq1100:pt-5 mq1100:pb-[23px] mq1100:box-border">
        <div className="h-[954px] w-[1440px] relative bg-whitesmoke hidden max-w-full" />
        <footer className="flex-1 rounded-xl bg-background-default-default flex flex-col items-end justify-start pt-[355px] px-4 pb-[42px] box-border max-w-full z-[2] mq450:pt-[150px] mq450:pb-5 mq450:box-border mq1100:pt-[231px] mq1100:pb-[27px] mq1100:box-border">
          <div className="w-[1368px] h-[905px] relative rounded-xl bg-background-default-default hidden max-w-full" />
          <FirstCardContent />
          <CardThreeContainer />
        </footer>
      </main>
      <img
        className="w-[13.8px] h-[11.7px] relative overflow-hidden shrink-0 hidden"
        alt=""
      />
    </div>
  );
};

export default Root1;
