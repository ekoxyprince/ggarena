import React from "react";
import HeroCard from "./HeroCard";
import Section from "./Section";
import { FeaturesData } from "../../Data";

function Features() {
  return (
    <Section className="bg-[#0B0816] features py-[50px] sm:py-[70px] px-4 sm:px-6 md:px-[60px]">
      <div className="flex flex-col gap-[60px] sm:gap-[80px] md:gap-[30px] md:flex-row">
        {FeaturesData.map((item, index) => {
          const { title, desc, IMG, miniIMG, miniText } = item;
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <HeroCard
                index={index}
                title={title}
                desc={desc}
                IMG={IMG}
                miniIMG={miniIMG}
                miniText={miniText}
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default Features;
