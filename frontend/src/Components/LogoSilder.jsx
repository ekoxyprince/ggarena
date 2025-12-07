import React from "react";
import Slider from "react-infinite-logo-slider";
import { Images } from "../assets/Images";
function LogoSilder() {
  const logos = [
    Images.partner1,
    Images.partner2,
    Images.partner3,
    Images.partner4,
    Images.partner5,
    Images.partner6,
    Images.partner7,
    Images.partner8,
    Images.partner9,
    Images.partner10,
  ];
  console.log(logos);
  return (
    <div className="py-[40px] bg-[#0B0816] pb-[70px]">
      <h4 className="text-center text-[20px] bg-text font-semibold">
        Communities on GG Arena.
      </h4>
      <div className="mt-[40px] ">
        <Slider
          width="180px"
          duration={25}
          pauseOnHover={true}
          blurBorders={true}
          blurBorderColor={"#0B0816"}
        >
          {logos.map((logo, index) => (
            <Slider.Slide key={index}>
              <img src={logo} alt="logo" className="w-20 md:w-32" />
            </Slider.Slide>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default LogoSilder;
