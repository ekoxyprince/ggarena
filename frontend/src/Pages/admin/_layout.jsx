import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../Components/AdminSidebar";
import AdminNavbar from "../../Components/AdminNavbar";

function Adminlayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#020617] flex">
      <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 px-3 py-3 md:px-6 md:py-6 space-y-4">
        <AdminNavbar onToggleSidebar={toggleSidebar} />
        <div className="w-full space-y-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Adminlayout;
