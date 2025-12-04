import React from "react";
import { Images } from "../assets/Images";
import { FaDiscord } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

function Discord() {
  return (
    <div
      className="
        hero 
        bg-cover bg-center bg-no-repeat 
        rounded-xl 
        max-w-[90%] sm:max-w-[85%] 
        w-full mx-auto 
        items-center 
        px-[18px] sm:px-[25px] 
        py-[25px] sm:py-[30px] 
        h-fit 
        flex flex-col sm:flex-row 
        justify-between 
        gap-[20px] sm:gap-[0px]
      "
      style={{ backgroundImage: `url(${Images.discordBg})` }}
    >
      {/* Left side content */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-3 sm:gap-2">
        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
          <img
            src={Images.logoIc}
            alt="Logo"
            className="w-[35px] sm:w-[43px]"
          />
          <IoMdClose size={24} className="hidden sm:block" />
          <FaDiscord size={40} sm:size={50} />
        </div>

        <p className="text-[15px] sm:text-[17.3px] text-white leading-6 sm:leading-7 max-w-[90%] sm:w-[280px] mt-2 sm:mt-0">
          Engage with our community and stay up to date about us!
        </p>
      </div>

      {/* Right side button */}
      <div className="w-full sm:w-auto flex justify-center sm:justify-end">
        <a
          href="https://discord.gg/Vpa9TBg2Uy"
          target="_blank"
          rel="noopener noreferrer"
          style={{ zIndex: 1000 }}
        >
          <CustomButton
            text="Join our Discord"
            className="
              bg-primary 
              btt 
              text-secondary 
              w-[180px] sm:w-[200px] 
              h-[45px] sm:h-[48px] 
              font-generalSans 
              text-[0.9rem] sm:text-[0.95rem] 
              font-bold 
              uppercase 
              mt-2 sm:mt-0
            "
          />
        </a>
      </div>
    </div>
  );
}

export default Discord;
