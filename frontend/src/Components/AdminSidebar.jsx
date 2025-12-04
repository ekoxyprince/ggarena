import React from "react";
import logo from "../assets/Images/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import AdminLinks from "../constants/AdminLinks";
import { GrLogout } from "react-icons/gr";
import { useAuth } from "../contexts/AuthContext";

function AdminSidebar({ isOpen, onClose }) {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/60 transition-opacity duration-200 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 px-4 w-[15rem] bg-[#020617] min-h-[100vh] flex flex-col gap-4 shadow-2xl shadow-black/60 transform transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:w-[14rem]`}
      >
        <div className="flex items-center gap-2 p-4 border-b border-slate-800/70">
          <img src={logo} alt="GG Arena logo" className="h-8 w-auto" />
          <span className="text-base font-semibold text-slate-100">Admin</span>
        </div>
        <div className="flex flex-col space-y-1 my-2 flex-1 overflow-y-auto pb-16">
          {AdminLinks.map((link, i) => (
            <NavLink
              to={link.url}
              key={i + link.title}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm sm:text-base text-slate-300 transition-colors duration-150 hover:bg-slate-800 hover:text-white"
              style={({ isActive }) =>
                isActive
                  ? {
                      background:
                        "linear-gradient(to right, rgba(30,64,175,0.45), rgba(6,148,162,0.45))",
                      color: "#f9fafb",
                    }
                  : {}
              }
              onClick={onClose}
            >
              <link.Icon size={20} />
              <p className="font-medium text-sm sm:text-base">{link.title}</p>
            </NavLink>
          ))}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mb-4 mx-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm sm:text-base text-rose-400 border border-rose-500/40 hover:bg-rose-600/10"
        >
          <GrLogout />
          <p className="font-medium">Logout</p>
        </button>
      </aside>
    </>
  );
}

export default AdminSidebar;
