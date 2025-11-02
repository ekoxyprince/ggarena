import React from "react";
import { Images } from "../../assets/Images";
import { Link } from "react-router-dom";
import formatNumber from "../../utils/formatNumber";

function CommunityCard({ data }) {
  const { name, image, participants, isVerified, _id } = data;
  return (
    <Link to={`/community/${_id}`} className="">
      <div className="flex flex-col w-[160px] md:w-[202px] items-center pb-[15px] bg-[#2e2e2e] rounded-[10px] px-[10px]">
        <div className="img-holder border-[#2e2e2e] border-4 mt-[-20px] w-[110px] h-[110px] overflow-hidden rounded-full">
          <img
            className="w-full h-full object-cover object-center"
            src={image}
            alt=""
          />
        </div>
        <Link>
          <h2 className="text-[16px] flex font-medium items-center line-clamp-1 mt-[10px]">
            {name}
            {isVerified && (
              <img className="w-[16px] ms-1" src={Images.verified} alt="" />
            )}
          </h2>
        </Link>
        <p className="text-[13.5px] text-primary/80">
          {formatNumber(participants.length)} member
          {participants.length > 1 ? "s" : ""}
        </p>
        {/* {isVerified ? (
          <button className="flex uppercase tracking-wide items-center w-full justify-center px-4 mt-[15px] mb-[10px] py-[8px] bg-[#1f1f1f] text-white font-semibold rounded-lg text-[13px]">
            Join
          </button>
        ) : (
          <button
            disabled={true}
            className="flex cursor-not-allowed uppercase tracking-wide items-center w-full justify-center px-4 mt-[15px] mb-[10px] py-[8px] bg-[#1f1f1f] text-white font-semibold rounded-lg text-[13px]"
          >
            Leave
          </button>
        )} */}
      </div>
    </Link>
  );
}

export default CommunityCard;
