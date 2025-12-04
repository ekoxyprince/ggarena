import React from "react";
import Section from "./Section";
import { Images } from "../assets/Images";
import CustomButton from "./CustomButton";
import { Link, useNavigate } from "react-router-dom";
import Discord from "./Discord";

function Info() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#140e28] w-full py-[40px] sm:py-[50px] mt-[0px]">
      <div
        className="
          py-0 
          flex flex-col lg:flex-row 
          max-w-[93%] w-full mx-auto 
          items-stretch 
          gap-y-[25px] lg:gap-x-[20px] 
          h-auto lg:h-[500px]
          px-4 sm:px-6
        "
      >
        {/* LEFT SECTION */}
        <div
          className="
            left 
            p-[20px] sm:p-[30px] 
            bg-cover bg-center 
            rounded-lg 
            w-full 
            h-[300px] sm:h-[400px] lg:h-full 
            max-w-[1000px]
          "
          style={{ backgroundImage: `url(${Images.about})` }}
        >
          <div className="w-full h-full flex flex-col gap-[10px] sm:gap-[15px] justify-end bg-black/5">
            <h1 className="font-semibold text-[22px] sm:text-[28px] text-white mb-[-4px]">
              About Us
            </h1>
            <p className="font-syne text-[14px] sm:text-[16px] text-white/90 leading-snug">
              Discover how our esports platform revolutionizes online gaming
              tournaments. Connect with the passionate professionals making it
              happen.
            </p>
            <CustomButton
              onPress={() => navigate("/about")}
              text="Learn More"
              className="bg-primary text-secondary w-[120px] sm:w-32 h-[38px] sm:h-[43px] !rounded-md"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="right flex flex-col gap-[20px] w-full max-w-full h-auto lg:h-full">
          {/* TOP CARD */}
          <div
            className="
              top 
              rounded-lg 
              bg-cover bg-center 
              p-[20px] sm:p-[24px] 
              h-[250px] sm:h-[250px] lg:h-[50%]
            "
            style={{ backgroundImage: `url(${Images.User})` }}
          >
            <div className="w-full h-full flex flex-col gap-[10px] sm:gap-[15px] justify-end bg-black/5">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={Images.gameOver}
                  className="w-[45px] sm:w-[60px]"
                  alt=""
                />
                <p className="text-[0.95rem] sm:text-[1.1rem] uppercase font-Pin font-normal text-white">
                  Players
                </p>
              </div>
              <p className="font-syne text-[13.5px] sm:text-[16px] text-white/90 leading-snug">
                Explore a variety of free tournaments, connect with a thriving
                community, and monetize your passion.
              </p>
              <CustomButton
                onPress={() => navigate("/signup")}
                text="Get Started"
                className="border-[1.5px] border-primary !font-normal text-white w-[110px] sm:w-28 h-[36px] sm:h-[40px] !rounded-md"
              />
            </div>
          </div>

          {/* BOTTOM CARD */}
          <div
            className="
              bottom 
              rounded-lg 
              bg-cover bg-center 
              p-[20px] sm:p-[24px] 
              h-[250px] sm:h-[250px] lg:h-[50%]
            "
            style={{ backgroundImage: `url(${Images.community})` }}
          >
            <div className="w-full h-full flex flex-col gap-[10px] sm:gap-[15px] justify-end bg-black/5">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={Images.comm}
                  className="w-[45px] sm:w-[55px]"
                  alt=""
                />
                <p className="text-[0.95rem] sm:text-[1.1rem] font-Pin uppercase font-normal text-white">
                  Community Manager
                </p>
              </div>
              <p className="font-syne text-[13.5px] sm:text-[16px] text-white/90 leading-snug">
                Effortlessly manage tournaments of any size. Benefit from quick
                setup, immediate player payments, and advanced admin tooling.
              </p>
              <CustomButton
                onPress={() => navigate("/signup")}
                text="Get Started"
                className="border-[1.5px] border-primary !font-normal text-white w-[110px] sm:w-28 h-[36px] sm:h-[40px] !rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
