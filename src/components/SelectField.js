import PropTypes from "prop-types";

const SelectField = ({ className = "" }) => {
  return (
    <div
      className={`flex-1 flex flex-col items-start justify-start py-0 px-0 box-border relative gap-[8px] min-w-[135px] text-left text-base text-text-default-default font-body-base ${className}`}
    >
      <div className="self-stretch h-[22px] relative leading-[140%] inline-block">
        Label
      </div>
      <div className="self-stretch h-[22px] relative leading-[140%] text-text-default-secondary hidden z-[1]">
        Description
      </div>
      <div className="self-stretch rounded-radius-200 bg-background-default-default box-border flex flex-row items-center justify-start py-2.5 pr-space-300 pl-space-400 relative gap-[8px] min-w-[240px] border-[1px] border-solid border-border-default-default mq450:flex-wrap">
        <div className="h-4 flex-1 relative leading-[100%] inline-block min-w-[122px]">
          Value
        </div>
        <img
          className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px]"
          alt=""
          src="/chevron-down.svg"
        />
        <div className="!m-[0] absolute top-[8px] left-[8px] shadow-[0px_1px_4px_rgba(12,_12,_13,_0.1),_0px_1px_4px_rgba(12,_12,_13,_0.05)] rounded-radius-200 bg-background-default-default hidden flex-col items-start justify-start py-1.5 px-[7px] gap-[8px] z-[2] border-[1px] border-solid border-border-default-default">
          <div className="h-[22px] relative leading-[140%] font-semibold inline-block">
            Hello World
          </div>
          <div className="h-[22px] relative leading-[140%] inline-block">
            Option 2
          </div>
          <div className="h-[22px] relative leading-[140%] inline-block">
            Option 3
          </div>
          <div className="h-[22px] relative leading-[140%] inline-block">
            Option 4
          </div>
          <div className="h-[22px] relative leading-[140%] inline-block">
            Option 5
          </div>
        </div>
      </div>
      <div className="!m-[0] absolute top-[8px] left-[8px] shadow-[0px_1px_4px_rgba(12,_12,_13,_0.1),_0px_1px_4px_rgba(12,_12,_13,_0.05)] rounded-radius-200 bg-background-default-default hidden flex-col items-start justify-start py-1.5 px-padding-sm gap-[8px] z-[3] border-[1px] border-solid border-border-default-default">
        <div className="h-[22px] relative leading-[140%] font-semibold inline-block">
          Value
        </div>
        <div className="h-[22px] relative leading-[140%] inline-block">
          Option 2
        </div>
        <div className="h-[22px] relative leading-[140%] inline-block">
          Option 3
        </div>
        <div className="h-[22px] relative leading-[140%] inline-block">
          Option 4
        </div>
        <div className="h-[22px] relative leading-[140%] inline-block">
          Option 5
        </div>
      </div>
    </div>
  );
};

SelectField.propTypes = {
  className: PropTypes.string,
};

export default SelectField;
