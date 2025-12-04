import React from "react";

function DashboardCard({ Icon, title, value, subText }) {
  return (
    <div className="w-full h-[8rem] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-black shadow-xl shadow-black/60 border border-slate-800 flex justify-between items-center px-5 py-4">
      <div className="flex-1 space-y-1">
        <p className="text-xs sm:text-sm md:text-base font-medium text-slate-400 uppercase tracking-wide">
          {title}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-50">
          {value}
        </h2>
        {subText ? (
          <p className="text-xs sm:text-sm font-medium text-emerald-400">
            {subText}
          </p>
        ) : null}
      </div>
      <div className="flex items-center justify-center w-16 h-16 md:w-14 md:h-14 rounded-2xl bg-slate-900/80 border border-slate-700 text-white ml-4 shadow-md shadow-black/50">
        <Icon size={26} />
      </div>
    </div>
  );
}

export default DashboardCard;
