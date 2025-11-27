import { Images } from "../../assets/Images";
import Layout from "../../Components/ui/Layout";
import CommunityCard from "../../Components/ui/CommunityCard";
import comIC1 from "../../assets/Images/comIC.webp";
import comIC2 from "../../assets/Images/comIC2.webp";
import comIC3 from "../../assets/Images/comIC3.webp";
import comIC4 from "../../assets/Images/comIC4.webp";
import comIC5 from "../../assets/Images/comIC5.webp";
import comIC6 from "../../assets/Images/comIC6.webp";
import comIC8 from "../../assets/Images/comIC8.webp";
import CustomButton from "../../Components/CustomButton";
import CommunityModal from "../../Components/ui/CommunityModal";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useFetch from "../../hooks/useFetch.js";
import { PacmanLoader } from "react-spinners";
import { useEffect, useState } from "react";

function Communities() {
  const { controlCommunityModal } = useGlobalContext();
  const [search, setSearch] = useState("");
  const { data, isPending, refetch } = useFetch({
    url: `/api/communities?q=${search}`,
    key: "get@communities",
  });
  useEffect(() => {
    refetch();
  }, [search]);

  if (isPending) {
    return <div className="w-full flex justify-center mt-4 py-8"></div>;
  }

  return (
    <div>
      <CommunityModal />
      <div
        className={` bg-cover bg-no-repeat bg-center h-[330px] relative img-bg`}
        style={{
          backgroundImage: `linear-gradient(transparent, #1F1F1F), url(${Images.leaderboard})`,
        }}
      ></div>
      <div className="relative mx-auto max-w-[560px] z-10 flex flex-col items-center h-full text-white text-center px-4 -mt-[100px]">
        <h2 className="text-[45px] font-bold font-Poppins">Communities</h2>
        <p className="text-[15px] font-syne -mt-2">
          Join communities of other gamers or build a new community of your own.
        </p>
        <CustomButton
          className="bg-primary !font-semibold text-secondary w-fit px-[25px] h-[45px] mt-[18px] !rounded-md"
          text={"Create Community"}
          onPress={controlCommunityModal}
        />
        <input
          className="w-full mt-[20px] md:w-[95%] text-[15.5px] bg-[#151515] outline-none border-2 border-[#3d3d3d] focus:border-primary/70 hover:border-primary/70 placeholder:text-[#d1d1d1]/80 rounded-lg py-[10px] px-[15px] h-[40.5px]"
          type="search"
          name="search"
          id=""
          onChange={(e) => {
            const { value } = e.target;
            setSearch(value);
          }}
          placeholder="Try searching for a community"
        />
      </div>
      <Layout>
        {data?.length == 0 ? (
          <div className="flex items-center justify-center">
            <p className="font-bold text-lg">No communities available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:flex flex-wrap gap-[40px] md:gap-[20px] mt-[90px] pb-[100px] gap-y-[50px] max-w-[87%] mx-auto w-fit">
            {data?.map((dt, index) => (
              <CommunityCard key={index} data={dt} />
            ))}
          </div>
        )}
      </Layout>
    </div>
  );
}

export default Communities;
