import React, { useRef, useEffect, useState } from "react";
import { Images } from "../../assets/Images";

function Preloader() {
  return (
    <div className="bg-[#111111] w-full h-full fixed top-0 left-0 z-[300] flex justify-center items-center">
      <div className="w-[100px] relative flex flex-col justify-center items-center scale-[0.95] select-none pointer-events-none">
        <img
          className="ann relative z-10 w-[90px] brightness-[1.2]"
          src={Images.pad}
          alt=""
        />
        <img
          src={Images.bar}
          className="w-[43px] brightness-[1.2] ann2 absolute"
          alt=""
        />
      </div>
    </div>
  );
}

export default Preloader;
