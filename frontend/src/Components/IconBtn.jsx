
import React from "react";

function IconBtn({ children, text }) {
  return (
    <button className="px-[14px] py-[12px] w-full border border-[#474747] flex items-center gap-[10px]">
      {children}
      <span className="font-Mont text-[14px]">{text}</span>
    </button>
  );
}

export default IconBtn;
