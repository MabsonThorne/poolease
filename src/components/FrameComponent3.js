import { useMemo } from "react";
import PropTypes from "prop-types";

const FrameComponent = ({
  className = "",
  minusCircle,
  propAlignSelf,
  propFlex,
  propMinWidth,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf, propFlex, propMinWidth]);

  return (
    <div
      className={`self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default flex flex-col items-start justify-end pt-[136px] px-1.5 pb-2.5 relative gap-[3px] z-[2] text-left text-smi text-black-100 font-body-base ${className}`}
      style={frameDivStyle}
    >
      <div className="w-[154px] h-[181px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-background-default-default hidden z-[0]" />
      <div className="relative inline-block min-w-[39px] z-[3]">商品名</div>
      <div className="relative inline-block min-w-[26px] z-[3]">价格</div>
      <img
        className="w-8 h-8 absolute !m-[0] top-[-16px] right-[-20px] overflow-hidden shrink-0 z-[3]"
        alt=""
        src={minusCircle}
      />
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  minusCircle: PropTypes.string,

  /** Style props */
  propAlignSelf: PropTypes.any,
  propFlex: PropTypes.any,
  propMinWidth: PropTypes.any,
};

export default FrameComponent;
