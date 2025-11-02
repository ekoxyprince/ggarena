import React from "react";

function DashboardCard({ Icon, title, value }) {
  return (
    <div className="w-full h-[8rem] bg-[#18181b] rounded-lg shadow-lg flex justify-between p-2 px-2 items-center border border-primary">
      <div className="text-center flex-[0.8]">
        <p className="text-xl md:text-lg text-gray-400 font-medium">{title}</p>
        <h2 className="text-3xl md:text-2xl text-white font-bold">{value}</h2>
      </div>
      <div className="max-w-[4rem] h-[4rem] rounded-[2rem] md:max-w-[3rem] md:h-[3rem] md:rounded-[1.5rem] border-2 border-primary flex-[0.2] flex items-center justify-center">
        <Icon size="20" color="#ffd700" />
      </div>
    </div>
  );
}

export default DashboardCard;
