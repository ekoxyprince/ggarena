import React from "react";
import { FaRegBell } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

function AdminNavbar() {
  return (
    <nav className="w-full flex items-center justify-between ">
      <p className="font-bold text-2xl text-gray-500">Welcome Admin</p>
      <div className="flex space-x-2"></div>
    </nav>
  );
}

export default AdminNavbar;
