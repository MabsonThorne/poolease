import FrameComponent1 from "../components/FrameComponent1";
import TableSelection from "../components/TableSelection";
import Order from "../components/Order";

const Root = () => {
  return (
    <div className="w-full relative rounded-xl bg-background-default-default overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
      <FrameComponent1 />
      <main className="self-stretch bg-whitesmoke flex flex-row items-start justify-start pt-3.5 px-9 pb-[35px] box-border gap-[37px] max-w-full mq1150:flex-wrap mq750:gap-[18px] mq750:pb-5 mq750:box-border mq1050:pt-5 mq1050:pb-[23px] mq1050:box-border">
        <div className="h-[954px] w-[1440px] relative bg-whitesmoke hidden max-w-full" />
        <TableSelection headerSeparator="pending_4:215" />
        <Order />
      </main>
    </div>
  );
};

export default Root;
