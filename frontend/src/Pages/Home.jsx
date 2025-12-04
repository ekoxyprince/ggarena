import React from 'react'
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { DatePicker } from "antd";
import Section from '../Components/Section';
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import LogoSilder from '../Components/LogoSilder';
import Info from '../Components/Info';
import Discord from '../Components/Discord';

function Home() {
  return (
    <>
      {/* <Preloader /> */}
      <Hero />
      <Features />
      <LogoSilder />
      <Info />
      <div className="!bg-[#0B0816] py-[50px]">
        <Discord />
      </div>
    </>
  );
}

export default Home
