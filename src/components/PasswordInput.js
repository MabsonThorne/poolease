import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaBackspace } from "react-icons/fa";

const PasswordInput = ({ className = "" }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleButtonClick = (num) => {
    if (password.length < 6) {
      setPassword(password + num);
    }
  };

  const handleClear = () => {
    setPassword("");
  };

  const handleBackspace = () => {
    setPassword(password.slice(0, -1));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`w-full h-full mb-4 flex-1 rounded-xl bg-background-default-default flex flex-col items-center justify-start p-4 box-border gap-6 ${className}`}
    >
      <div className="w-full max-w-md flex flex-col items-center justify-start gap-4">
        <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-10">
          <div className="relative z-[2] text-2xl">
            请输入密码
          </div>
        </div>
        <div className="relative w-full flex items-center border border-black-100 rounded-3xs p-2">
          <input
            className="w-full border border-black-100 outline-none text-2xl bg-transparent text-gray-700 rounded-3xs p-2"
            placeholder="请输入6位数密码"
            type={showPassword ? "text" : "password"}
            value={password}
            readOnly
          />
          <button className="absolute right-10 text-gray-600" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button className="absolute right-2 text-gray-600" onClick={handleBackspace}>
            <FaBackspace />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div
              key={num}
              className="flex items-center justify-center w-full pt-full bg-gray-300 rounded-3xs cursor-pointer"
              style={{ aspectRatio: '1 / 1' }}
              onClick={() => handleButtonClick(num)}
            >
              <div className="text-black text-2xl">{num}</div>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-between mt-4">
          <button
            className="flex-1 mx-1 rounded-3xs bg-black-100 text-white p-4"
            onClick={handleClear}
          >
            清除
          </button>
          <button
            className="flex-1 mx-1 rounded-3xs bg-black-100 text-white p-4"
          >
            开台
          </button>
        </div>
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  className: PropTypes.string,
};

export default PasswordInput;
