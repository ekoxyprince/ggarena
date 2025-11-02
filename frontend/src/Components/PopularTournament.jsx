import React from "react";
import TornamentCard from "./ui/TornamentCard";
import { GoChevronDown } from "react-icons/go";
import Tors from "../constants/Tors";
import useFetch from "../hooks/useFetch";
import { PacmanLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function PopularTournament({ tournaments }) {
  const navigate = useNavigate();
  return (
    <div className="mt-[60px] mb-[60px] px-[25px]">
      <p className="mb-[15px] text-[27px] font-bold">Popular Tournaments</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
        {tournaments?.map((d, index) => {
          return <TornamentCard key={index} data={d} />;
        })}
      </div>
      <div className="flex items-center gap-4 my-6 mt-[50px]">
        <div className="flex-1 h-[1.9px] bg-[#2e2e2e]"></div>
        <button
          onClick={() => navigate("/tournaments")}
          className="flex items-center px-4 py-[10px] bg-[#2e2e2e] text-white font-semibold rounded-lg text-sm"
        >
          Show more
          <span className="ml-1">
            <GoChevronDown />
          </span>
        </button>
        <div className="flex-1 h-[1.9px] bg-[#2e2e2e]"></div>
      </div>
    </div>
  );
}

export default PopularTournament;
