import React from "react";
import Layout from "../../Components/ui/Layout";
import { Images } from "../../assets/Images";
import CustomButton from "../../Components/CustomButton";
import PopularTournament from "../../Components/PopularTournament";
import PopularCommunities from "../../Components/PopularCommunities";
import PopularMarketplace from "../../Components/PopularMarketplace";
import gameBg from "../../assets/Images/dash-bg.png";
import gameOv from "../../assets/Images/game-ov.png";
import Platforms from "../../constants/Platforms";
import Games from "../../constants/Games";
import OverviewCard from "../../Components/ui/OverviewCard";
import tournament from "../../assets/Images/tournament.png";
import trophy from "../../assets/Images/trophy.png";
import community from "../../assets/Images/community.png";
import created from "../../assets/Images/social-care.png";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function Account() {
  const { data: games } = useFetch({ url: "/api/games", key: "games" });
  const { data: platforms } = useFetch({
    url: "/api/platforms",
    key: "platforms",
  });
  const { data: details } = useFetch({
    url: "/api/user/dashboard/details",
    key: "dashboard",
  });
  return (
    <div className="w-full">
      <Layout>
        <div className="grid acc-lg-grid gap-5 pt-[70px] px-3 sm:px-5 md:px-[20px]">
          <div
            style={{ backgroundImage: `url(${gameBg})` }}
            className="w-full h-[20rem] rounded-xl bg-no-repeat bg-cover relative"
          >
            <div className="w-full mr-auto relative top-[50%] translate-y-[-50%] px-1 md:px-[25px]">
              <h2 className="text-base sm:text-lg md:text-[29px] font-syne ">
                Join the action and compete for glory in our thrilling gaming
                tournaments!{" "}
              </h2>
              <Link to="/communities">
                <CustomButton
                  className="bg-primary !font-semibold text-secondary w-32 h-[40px] mt-[18px] !rounded-md"
                  text={"Start Playing"}
                />
              </Link>
            </div>
            <img
              className=" hidden md:block md:w-[43%] absolute -right-[35px] -top-10 md:-top-[5rem]"
              src={gameOv}
              alt=""
            />
          </div>
          <div className="w-full">
            <div>
              <p className="">Games</p>
              {games?.length == 0 ? (
                <div className="flex items-center justify-center">
                  <p className="font-bold text-sm">No games available</p>
                </div>
              ) : (
                <div className="my-2 grid grid-cols-5 md:grid-cols-3 gap-4">
                  {games?.map((g, i) => {
                    return (
                      <div className="h-[53px] w-[52px]">
                        <img
                          key={`index-${i}`}
                          src={g.image}
                          className="brightness-[95%] w-full h-full border-primary/80 border-[2.1px] rounded-lg overflow-hidden"
                          alt=""
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="mt-2">
              <p>Platforms</p>
              {platforms?.length == 0 ? (
                <div className="flex items-center justify-center">
                  <p className="font-bold text-sm">No platforms available</p>
                </div>
              ) : (
                <div className="my-2 grid grid-cols-5 md:grid-cols-3 gap-2.5">
                  {platforms?.map((p, i) => {
                    return (
                      <div className="h-[53px] w-[52px]">
                        <img
                          key={`index-${i}`}
                          src={p.image}
                          className="brightness-[95%] border-primary/80 border-[2.1px] w-full h-full rounded-lg overflow-hidden"
                          alt=""
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
      <Layout>
        <PopularTournament tournaments={details?.tournaments} />
        <PopularCommunities communities={details?.communities} />
        <PopularMarketplace />
      </Layout>
    </div>
  );
}

export default Account;
