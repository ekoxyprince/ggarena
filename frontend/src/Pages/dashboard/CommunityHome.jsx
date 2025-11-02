import React from "react";
import comIC1 from "../../assets/Images/comIC.webp";
import comIC2 from "../../assets/Images/comIC2.webp";
import comIC3 from "../../assets/Images/comIC3.webp";
import comIC4 from "../../assets/Images/comIC4.webp";
import img1 from "../../assets/Images/torpic7.jpeg";
import img2 from "../../assets/Images/torpic2.webp";
import img3 from "../../assets/Images/torpic4.webp";
import img4 from "../../assets/Images/torpic3.webp";
import { TbFlag3 } from "react-icons/tb";
import { Link } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
import { GrGroup } from "react-icons/gr";
import { IoMailOutline } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import formatNumber from "../../utils/formatNumber";

function CommunityHome() {
  const { id } = useParams("id");
  const { data } = useFetch({
    url: `/api/communities/${id}`,
    key: `community@${id}`,
  });
  const upcoming = [
    {
      image: img2,
      title: "Fifa 25 Tournament #1 - GamingGuru championship Series",
      game: "Fifa 25",
      host: "GamingGuru",
      hostImage: comIC1,
      date: "Jul 20, 10:00 PM",
      prize: "220K NGN",
      players: "12/12",
      type: "1v1",
      category: "Single Elimination",
    },
    {
      image: img1,
      title: "call of duty mobile tournament #1 - Battle of the Fittest",
      game: "Call of Duty Mobile",
      host: "Dan2Dev",
      hostImage: comIC1,
      date: "Jul 20, 10:00 PM",
      prize: "150K NGN",
      players: "4/4",
      type: "1v1",
      category: "Battle Royale",
    },
    {
      image: img3,
      title: "call of duty mobile tournament #2 - Battle of the Champions",
      game: "Call of Duty Mobile",
      host: "futureGamers",
      hostImage: comIC1,
      date: "Jul 30, 10:00 PM",
      prize: "150K NGN",
      players: "2/4",
      type: "1v1",
      category: "Battle Royale",
    },
    {
      image: img4,
      title: "Fifa 25 Club world Cup - Round 1",
      game: "Fifa 25",
      host: "gingerGaming",
      hostImage: comIC1,
      date: "Jul 20, 10:00 PM",
      prize: "220K NGN",
      players: "12/12",
      type: "1v1",
      category: "Single Elimination",
    },
  ];
  const icons = [
    {
      icon: TbFlag3,
      title: "Joined over 2 years ago",
    },
    {
      icon: GrGroup,
      title: "2K members",
    },
    {
      icon: IoMailOutline,
      title: "GamingGuru@gmail.com",
    },
  ];
  const details = [
    "Single Elimination",
    "5v5",
    "10/20",
    "GamingGuru",
    "Fifa 25",
  ];
  return (
    <div className="mt-[30px]">
      <div className="mb-[17px] flex items-center justify-between">
        <h3 className="font-Poppins font-bold text-[23px] ">
          Upcoming tournaments
        </h3>
        <Link to="/tournaments">
          <button className="text-md text-primary font-semibold">
            View All
          </button>
        </Link>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-[20px]">
          {data?.upcomingTournaments?.map((tournament, index) => (
            <div
              key={index}
              className={`w-full ${
                index === 0
                  ? "md:col-span-3 flex flex-col md:flex-row gap-5 md:gap-[30px] items-start md:items-center"
                  : ""
              }`}
            >
              {/* Image */}
              <div
                className={`img-holder w-full h-[200px] sm:h-[250px] md:h-[220px] overflow-hidden rounded-xl ${
                  index === 0 ? "md:w-[50%] md:h-[380px]" : ""
                }`}
              >
                <img
                  className="w-full h-full object-cover object-center"
                  src={tournament.image}
                  alt=""
                />
              </div>

              {/* Info Section */}
              <div
                className={`bottom w-full mt-3 sm:mt-[10px] flex gap-2 items-start justify-start ${
                  index === 0 ? "md:w-[50%]" : ""
                }`}
              >
                {/* Host Icon */}
                <div
                  className={`host w-[35px] sm:w-[40px] h-[35px] sm:h-[40px] rounded-full overflow-hidden ${
                    index === 0 ? "hidden" : ""
                  }`}
                >
                  <img
                    className="w-full h-full object-cover object-center"
                    src={tournament.hostedBy.image}
                    alt=""
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col w-[85%] sm:w-[80%] gap-1">
                  <p
                    className={`text-xs sm:text-sm text-primary font-semibold ${
                      index === 0 ? "sm:text-[14px]" : ""
                    }`}
                  >
                    {new Date(tournament.createdAt).toDateString()}
                  </p>
                  <Link
                    to={`/tournament/${tournament._id}`}
                    className={`hover:underline text-[14px] sm:text-[16px] text-white/95 ${
                      index === 0
                        ? "text-[20px] sm:text-[25px] font-bold leading-6 sm:leading-8"
                        : "line-clamp-2 font-semibold"
                    }`}
                  >
                    {tournament.name}
                  </Link>

                  <div
                    className={`flex flex-wrap items-center gap-1.5 sm:gap-2 text-gray-300 ${
                      index === 0
                        ? "text-[13px] sm:text-[15px] mt-[2px]"
                        : "text-xs sm:text-sm"
                    }`}
                  >
                    <span>{tournament.mode}</span>
                    <span>•</span>
                    <span>
                      {tournament.mode == "1v1"
                        ? "Single Elimination"
                        : "Battle royale"}
                    </span>
                    <span>•</span>
                    <span>{tournament.game.name}</span>
                    <span>•</span>
                    <span>
                      {tournament.participants.length}/
                      {tournament.totalParticipants}
                    </span>
                  </div>

                  {/* Hosted By */}
                  <div
                    className={`${
                      index === 0
                        ? "flex gap-2 items-center mt-[6px]"
                        : "hidden"
                    }`}
                  >
                    <div className="host w-[35px] sm:w-[40px] h-[35px] sm:h-[40px] rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover object-center"
                        src={tournament.hostedBy.image}
                        alt=""
                      />
                    </div>
                    <p className="text-sm sm:text-base">
                      Hosted by {tournament.hostedBy.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[50px]">
        <div className="mb-[17px] flex items-center justify-between">
          <h3 className="font-Poppins font-bold text-[23px] ">
            Past tournaments
          </h3>
          <Link to="/tournaments">
            <button className="text-md text-primary font-semibold">
              View All
            </button>
          </Link>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {data?.pastTournaments?.map((tournament, index) => (
              <div
                key={index}
                className={`'w-ful
                }`}
              >
                <div
                  className={`img-holder w-full h-[180px] overflow-hidden rounded-lg`}
                >
                  <img
                    className="w-full h-full object-cover object-center "
                    src={tournament.image}
                    alt=""
                  />
                </div>
                <div className={`bottom mt-[10px]  flex gap-2 items-start `}>
                  <div
                    className={`host w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center`}
                  >
                    <img
                      className="w-full h-full object-cover object-center "
                      src={tournament.hostedBy.image}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-[80%]">
                    <p className={`text-sm text-primary font-semibold`}>
                      {new Date(tournament.createdAt).toLocaleString()}
                    </p>
                    <Link
                      className={` hover:underline line-clamp-1 font-semibold text-[16px] text-white/95`}
                    >
                      {tournament.name}
                    </Link>
                    <div
                      className={`flex flex-wrap items-center text-sm gap-2 text-gray-300`}
                    >
                      <span>{tournament.mode}</span>
                      <span>•</span>
                      <span>
                        {" "}
                        {tournament.mode == "1v1"
                          ? "Single Elimination"
                          : "Battle royale"}
                      </span>
                      <span>•</span>
                      <span>{tournament.game.name}</span>
                      <span>•</span>
                      <span>
                        {tournament.participants.length}/
                        {tournament.totalParticipants}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[50px] about">
        <h3 className="font-Poppins font-bold text-[23px] mb-[17px]">About</h3>
        <div className="w-full h-fit pb-[50px] rounded-lg border-[0.5px]  border-primary/30 py-[30px] px-[25px]">
          <div className="top flex space-y-4 md:space-y-0 flex-col md:flex-row items-center justify-between">
            <div className="flex gap-[15px] items-center">
              <div className="host w-[80px] h-[80px] rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  src={data?.image}
                  alt=""
                />
              </div>
              <p className="font-bold text-[20px]">{data?.name}</p>
            </div>
          </div>
          <div className="bottom mt-[35px]">
            <p className="leading-7 text-[16px] text-white/80 mb-[20px] w-[80%]">
              {data?.description}
            </p>
            <div className="icons mt-[25px]">
              {icons.map((icon, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 mb-[15px] text-white/80"
                >
                  <icon.icon className="text-primary/80" size={22} />
                  <p className="text-[15px]">
                    {index == 0
                      ? data
                        ? "created on " +
                          new Date(data.createdAt).toDateString()
                        : ""
                      : index == 1
                      ? formatNumber(data?.participants.length)
                      : data?.officialEmail}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-[60px] cursor-pointer h-[60px] flex justify-center items-center bg-[#2e2e2e] rounded-full overflow-hidden mt-[20px]">
              <FaDiscord className="text-white text-[32px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityHome;
