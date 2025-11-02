import React from "react";
import CommunityCard from "./ui/CommunityCard";
import comIC1 from "../assets/Images/comIC.webp";
import comIC2 from "../assets/Images/comIC2.webp";
import comIC3 from "../assets/Images/comIC3.webp";
import comIC4 from "../assets/Images/comIC4.webp";
import comIC5 from "../assets/Images/comIC5.webp";
import comIC6 from "../assets/Images/comIC6.webp";
import comIC7 from "../assets/Images/comIC7.webp";
import comIC8 from "../assets/Images/comIC8.webp";
import useFetch from "../hooks/useFetch.js";
import { PacmanLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
function PopularCommunities({ communities }) {
  const navigate = useNavigate();
  return (
    <div className=" px-[10px] md:px-[25px] w-full overflow-hidden mb-[70px]">
      <div className="flex items-center justify-between mb-[15px]">
        <p className="text-[27px] font-bold">Popular Communities</p>
        <span onClick={() => navigate("/communities")} className="text-primary">
          View all
        </span>
      </div>
      <div className="grid grid-cols-2 md:flex flex-wrap gap-[40px] md:gap-[20px] mt-[35px] gap-y-[50px]">
        {communities?.map((dt, index) => (
          <CommunityCard key={index} data={dt} />
        ))}
      </div>
    </div>
  );
}

export default PopularCommunities;
