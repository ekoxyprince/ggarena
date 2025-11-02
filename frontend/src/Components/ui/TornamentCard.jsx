import React from "react";
import { Images } from "../../assets/Images";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoMdTrophy } from "react-icons/io";
import { Link } from "react-router-dom";
import formatNumber from "../../utils/formatNumber";

function TornamentCard({ data }) {
  const {
    game,
    name,
    image,
    hostedBy,
    price,
    totalParticipants,
    mode,
    status,
    currency,
    participants,
    createdAt,
    _id,
  } = data;
  return (
    <div className="w-full h-fit relative rounded-lg overflow-hidden cursor-pointer p-0 text-center">
      <div className="img-holder relative h-[170px] overflow-hidden">
        <div className="absolute top-[10px] px-[10px] flex justify-between items-center w-full">
          <div className="player flex items-center gap-1 text-white sugg p-[2.5px] px-2 rounded-md">
            <AiOutlineUsergroupAdd size={17} />
            <span className="text-[12px]">{`${participants.length}/${totalParticipants}`}</span>
          </div>
          <div className="typmodeext-white sugg p-[2.5px] px-3 rounded-md">
            <span className="text-[12px]">{mode}</span>
          </div>
        </div>
        <div className="type absolute bottom-[10px] right-[10px] text-white sugg p-[2.5px] px-3 rounded-md">
          <span className="text-[12px]">{status?.toUpperCase()}</span>
        </div>
        <img className="w-full h-full object-cover" src={image} alt="" />
      </div>
      <div className="bottom text-left !pt-[10px] bg-[#262626] p-[10px] md:p-[15px]">
        <p className="game_name text-primary mb-[-2px] text-[12px] font-syne">
          {game.name}
        </p>
        <Link
          to={`/tournament/${_id}`}
          className="tornament_name group hover:underline !line-clamp-2 !overflow-hidden !leading-6 mt-[5px] font-medium text-white text-[15.5px] tor-text"
        >
          {name}
        </Link>
        <div className="hosted">
          <span className="text-[12px]">Hosted by</span>
          <div className="flex items-center gap-2 mt-[3px]">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={hostedBy?.image}
                alt=""
              />
            </div>
            <p className="text-[14px] hover:underline text-[#d1d1d1]">
              {hostedBy?.name}
            </p>
          </div>
        </div>
      </div>
      <div className="down w-full bg-[#2E2E2E] p-[10px] md:px-[15px] py-[15px] flex justify-between items-center">
        <p className="text-[13.5px]">{new Date(createdAt).toDateString()}</p>
        <p className="text-[15px] flex items-center gap-1 text-white">
          <IoMdTrophy size={17} className="text-primary" />
          {formatNumber(price)?.replace(".0", "")?.toUpperCase() +
            " " +
            currency}
        </p>
      </div>
    </div>
  );
}

export default TornamentCard;
