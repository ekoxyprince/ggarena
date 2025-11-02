import React from "react";
import logo from "../assets/Images/Logo.png";
import { NavLink } from "react-router-dom";
import AdminLinks from "../constants/AdminLinks";
import { GrLogout } from "react-icons/gr";

function AdminSidebar() {
  return (
    <div className="w-full p-4 hidden lg:block">
      <div className="w-full h-full relative">
        <aside className="top-0 left-0 right-0 px-2 w-[12rem] min-h-[100vh] flex flex-col gap-4 fixed shadow-[1px_2px_0px_rgba(255,255,255,.15)]">
          <div className="p-2">
            <img src={logo} alt="" />
          </div>
          <div className="flex flex-col space-y-4 my-2">
            {AdminLinks.map((link, i) => (
              <NavLink
                to={link.url}
                key={i + link.title}
                className={
                  "flex space-x-2 items-center text-gray-500 rounded-lg p-1 duration-200 transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"
                }
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: "rgba(255,255,255,0.2)",
                        color: "white",
                      }
                    : {}
                }
              >
                <link.Icon size={25} />
                <p className="font-medium text-lg">{link.title}</p>
              </NavLink>
            ))}
          </div>
          <button className="flex space-x-2 items-center text-gray-500 rounded-md absolute bottom-2 w-full">
            <GrLogout color="red" />
            <p className="font-medium text-lg">Logout</p>
          </button>
        </aside>
      </div>
    </div>
  );
}

export default AdminSidebar;
