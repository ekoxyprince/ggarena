import React from "react";
import { Images } from "../../assets/Images";
import CustomButton from "../../Components/CustomButton";
import { Link } from "react-router-dom";
import Layout from "../../Components/ui/Layout";
import { CiSearch } from "react-icons/ci";
import { Select } from "antd";
import TornamentCard from "../../Components/ui/TornamentCard";
import Tors from "../../constants/Tors";
import useFetch from "../../hooks/useFetch";
import { PacmanLoader } from "react-spinners";
function Tournaments() {
  const [search, setSearch] = React.useState("");
  const {
    data: tournaments,
    isPending,
    refetch,
  } = useFetch({
    key: "tournaments",
    url: `/api/tournaments?q=${search}`,
  });
  React.useEffect(() => {
    refetch();
  }, [search]);
  if (isPending) {
    return <div className="w-full flex justify-center mt-4 py-8"></div>;
  }

  return (
    <div className="!pb-[100px]">
      <div
        className={` bg-cover bg-no-repeat bg-[center] h-[330px] relative img-bg`}
        style={{
          backgroundImage: `linear-gradient(transparent, #1F1F1F), url(${Images.torBanner1})`,
        }}
      >
        <div className="overlay absolute w-full h-full bg-[#1f1f1f] opacity-[.27]"></div>
      </div>
      <div className="relative mx-auto  z-10 flex flex-col items-center h-full text-white text-center px-4 -mt-[163px]">
        <h2 className="text-[50px] font-bold mb-[1.5px] font-Poppins">
          Explore Tournaments
        </h2>
        <p className="text-[15px] font-syne max-w-[550px] text-[#d1d1d1] -mt-2">
          Compete with players worldwide and earn cash by playing your favorite
          games on mobile, PlayStation, Xbox, or PC
        </p>
        {/* <Link to="/tournaments/create">
          <CustomButton
            className="bg-primary !font-semibold text-secondary w-fit px-[25px] h-[45px] mt-[18px] !rounded-md"
            text={"Create Tournament"}
          />
        </Link> */}
      </div>
      <Layout>
        <form action="" className="mt-[80px] flex justify-between items-center">
          <div className="w-[100%] h-fit relative">
            <input
              className="w-full text-[15.5px] bg-[#151515] outline-none border-2 border-[#3d3d3d] focus:border-primary/70 hover:border-primary/70 placeholder:text-[#d1d1d1]/80 rounded-lg py-[10px] px-[15px] h-[45px]"
              type="text"
              name=""
              id=""
              onChange={(e) => {
                const { value } = e.target;
                setSearch(value);
              }}
              placeholder="Search Tournaments"
            />
            <CiSearch
              className="absolute right-[25px] top-[50%] translate-y-[-50%]"
              size={20}
            />
          </div>
        </form>
      </Layout>
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[35px]">
          {tournaments?.map((data, index) => {
            return <TornamentCard key={index} data={data} />;
          })}
        </div>
      </Layout>
    </div>
  );
}

export default Tournaments;
