import React from "react";

function CustomButton({ text, className, onPress, isDisabled = false }) {
  return (
    <button
      disabled={isDisabled}
      onClick={onPress}
      className={`rounded-xl py-[0.4rem] px-2 hover:opacity-[90%] font-normal md:font-semibold ${className}`}
    >
      {text}
    </button>
  );
}

export default CustomButton;
