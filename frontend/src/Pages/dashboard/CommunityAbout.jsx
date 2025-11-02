import React from "react";
import BannerMM from "../../assets/Images/hawk.jpeg";
import comIC1 from "../../assets/Images/comIC.webp";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import { VscChevronRight } from "react-icons/vsc";
import { Tooltip } from "@heroui/react";
import { Images } from "../../assets/Images";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import formatNumber from "../../utils/formatNumber";

function CommunityAbout() {
  const { id } = useParams("id");
  const { data } = useFetch({
    url: `/api/communities/${id}`,
    key: `community@${id}`,
  });
  const members = [
    {
      id: 1,
      link: "",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      id: 2,
      link: "",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    },
    {
      id: 3,
      link: "",
      avatar: Images.newUser4,
    },
    {
      id: 4,
      link: "",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    },
    {
      id: 5,
      link: "",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026402d",
    },
    {
      id: 6,
      link: "",
      avatar: Images.newUser4,
    },
    {
      id: 7,
      link: "",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026502d",
    },
    {
      id: 8,
      link: "",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026802d",
    },
    {
      id: 9,
      link: "",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026602d",
    },
    {
      id: 10,
      link: "",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
  ];
  return (
    <div className="mt-[40px]">
      <div className="top flex flex-col lg:flex-row w-full items-start gap-5">
        <div className="w-full lg:w-[70%]">
          <p className="font-bold">Members</p>
          <span className="text-[14px] font-Poppins">
            {parseInt(data?.participants.length).toLocaleString()} members
          </span>
          <p className="font-bold mt-[20px]">Description</p>
          <span className="text-[14px] font-Poppins">{data?.description}</span>
        </div>
        <div className="w-full lg:w-[30%] h-fit bg-slate-500 rounded-2xl overflow-hidden">
          <div
            className={`bg-cover bg-no-repeat bg-center h-[150px] relative overflow-hidden img-bg`}
            style={{
              backgroundImage: `linear-gradient(
  rgba(38,38,38,0) 0%,
  rgba(38,38,38,0.2) 35%,
  rgba(38,38,38,1) 100%
), url(${BannerMM})`,
            }}
          >
            <div className="overlay w-full h-full absolute left-0 top-0 bg-[#262626]/45"></div>
            <div className="top flex items-center justify-between p-[20px] pb-0 relative z-10">
              <div className="flex gap-[8px] items-center">
                <div className="host w-[55px] h-[55px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={data?.image}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-bold text-[16px]">{data?.name}</p>
                  <p className="text-small font-sm text-primary">
                    {formatNumber(data?.participants.length)} Members
                  </p>
                </div>
              </div>
            </div>
            <div className="bottom relative z-10 w-full p-[20px]">
              <p className="text-[13.5px] font-Poppins text-white">
                Having issues in our Community or with any of our competitions?
                Reach out to us for help.
              </p>
            </div>
          </div>
          <div className=" w-full h-fit bg-[#262626] px-[15px] py-[7px]">
            <Link className="flex items-center justify-between bg-[#373737] overflow-hidden rounded-2xl p-[10px] py-[8px]">
              <div className="flex items-center gap-2">
                <div className="w-[50px] cursor-pointer h-[50px] flex justify-center items-center bg-[#2e2e2e] rounded-full overflow-hidden">
                  <FaDiscord className="text-white text-[32px]" />
                </div>
                <div className="flex flex-col">
                  <p className=" text-[15px] font-semibold">Discord</p>
                  <span className="text-[13px] -mt-[0.5px] text-primary/80">
                    {data?.discordChannel}
                  </span>
                </div>
              </div>
              <VscChevronRight size={20} className="text-white" />
            </Link>
            <span className=" text-[11px] text-center block mt-[5px] text-white/85">
              This support is provided by admins of {data?.name}.
            </span>
          </div>
        </div>
      </div>
      <div className="bottom flex flex-col-reverse md:flex-row gap-5  mt-[40px]">
        <div className="left w-full md:w-[70%]">
          <h3 className="font-Poppins font-bold text-[23px] mb-[15px]">
            Members
          </h3>
          <div className="flex gap-2 gap-y-4 flex-wrap">
            {data?.participants
              .filter((d) => d.isAdmin == true)
              .map((member) => (
                <Tooltip
                  content={
                    <div className="px-1 py-2 bg-red-400">
                      <div className="text-small font-bold">
                        {member.user.fullname}
                      </div>
                      <div className="text-tiny"></div>
                    </div>
                  }
                >
                  <Link
                    to={"#"}
                    key={member._id}
                    className="w-[140px] h-[140px] rounded-full overflow-hidden"
                  >
                    <img
                      className="w-full h-full object-cover object-center"
                      src={member.user.profilePic}
                      alt=""
                    />
                  </Link>
                </Tooltip>
              ))}
          </div>
        </div>
        <div className="right w-full md:w-[30%]">
          <h3 className="font-Poppins font-bold text-[23px] mb-[15px]">
            Admin
          </h3>
          <div className="flex gap-[8px] items-center">
            <div className="host w-[65px] h-[65px] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={data?.createdBy.profilePic}
                alt=""
              />
            </div>
            <div>
              <p className="font-bold text-[16px]">
                {data?.createdBy.fullname}
              </p>
              <p className="text-[11px] bg-primary w-fit rounded-2xl px-[10px] font-bold  mt-[4px] text-secondary">
                Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityAbout;
