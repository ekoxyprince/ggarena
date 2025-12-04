import React from "react";
import { FaRegBell } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

function AdminNavbar({ onToggleSidebar }) {
  return (
    <nav className="w-full flex items-center justify-between rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 px-4 py-3 shadow-lg shadow-black/50">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-[#27272f] focus:outline-none focus:ring-2 focus:ring-primary lg:hidden"
        >
          <FiMenu size={20} />
        </button>
        <p className="font-bold text-lg sm:text-xl lg:text-2xl text-slate-50">
          Welcome Admin
        </p>
      </div>
      <div className="flex items-center gap-3 text-gray-300">
        <FaRegBell className="hidden md:block" />
        <FaRegUserCircle size={26} />
      </div>
    </nav>
  );
}

export default AdminNavbar;
