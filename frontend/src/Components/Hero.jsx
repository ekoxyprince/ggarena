import React from "react";
import Section from "./Section";
import { Images } from "../assets/Images";
import CustomButton from "./CustomButton";
import { Link, useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <div
      className={`hero bg-cover bg-no-repeat bg-center h-fit relative`}
      style={{ backgroundImage: `url(${Images.BBG2})` }}
    >
      {/* Overlay */}
      <div className="overlay w-full h-full bg-black/40 absolute left-0 top-0"></div>

      <Section className="py-[80px] sm:py-[100px] relative flex flex-col gap-10 px-4 sm:px-6 md:px-10">
        {/* Top Section */}
        <div className="top flex flex-col gap-3 justify-top mt-[70px] sm:mt-[100px] items-center text-center">
          <h1 className="font-semibold font-Oxanium text-[34px] sm:text-[45px] md:text-[60px] text-white leading-tight">
            Tournament Management Made
          </h1>
          <h1 className="font-semibold font-Oxanium text-[34px] sm:text-[45px] md:text-[60px] text-[#ffd700] leading-tight -mt-2 sm:-mt-3">
            Simple For Everyone
          </h1>

          <p className="font-syne text-center max-w-[90%] sm:max-w-[70%] md:max-w-[55%] text-[15px] sm:text-[18px] md:text-[20px] text-white/90 mt-3">
            Create tournaments, manage teams, chat with players, and track
            matches live. GG Arena makes competitive gaming smooth, fun, and
            fair.
          </p>

          <CustomButton
            onPress={() => navigate("/signup")}
            isDisabled={false}
            text="Join the Action"
            className="bg-primary btt text-secondary mt-[25px] sm:mt-[30px] w-[170px] sm:w-[200px] h-[48px] sm:h-[52px] font-syne text-[0.9rem] sm:text-[0.95rem] font-extrabold uppercase"
          />
        </div>

        {/* Bottom Image */}
        <div className="bottom flex justify-center items-center mt-10 sm:mt-12">
          <div className="relative handheld-motion">
            <img
              src={Images.characterBg}
              alt="Hero character"
              className="w-[100%] max-w-[350px] sm:max-w-[600px] md:max-w-[900px] opacity-[90%]"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

export default Hero;
