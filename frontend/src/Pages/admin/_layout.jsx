import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../Components/AdminSidebar";
import AdminNavbar from "../../Components/AdminNavbar";

function Adminlayout() {
  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[12rem_auto] gap-2 my-2 ">
      <AdminSidebar />
      <div className="p-2 space-y-2 my-2">
        <AdminNavbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Adminlayout;
