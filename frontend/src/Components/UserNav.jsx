import React, { useState, useEffect, useRef } from "react";
import { Images } from "../assets/Images";
import { IoNotifications } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaEllipsisV } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useGlobalContext } from "../contexts/GlobalContext";

function UserNav({ user }) {
  const { pathname } = useLocation();
  const { setNavOpen } = useGlobalContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarRef = useRef(null);
  const { logout } = useAuth();
  const Links = [
    { name: "Home", path: "/account" },
    { name: "Tournaments", path: "/tournaments" },
    { name: "Communities", path: "/communities" },
    { name: "Profile", path: "/profile" },
  ];

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const toggleSidebar = () => setNavOpen();
  const toggleAvatarMenu = () => setAvatarMenuOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-w-[100%] bg-[#2e2e2e] fixed top-0 h-[60px] px-4 md:px-6 flex items-center justify-between left-0 z-50">
      {/* Logo & Desktop Links */}
      <div className="flex items-center gap-6 md:gap-[45px] w-full">
        {/* Logo */}
        <Link to={"/account"} className="flex items-center shrink-0">
          <img
            className="w-[28px] md:w-[29px]"
            src={Images.logoIc}
            alt="Logo"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex text-[14px] md:text-[15.5px] text-white font-light items-center gap-4 md:gap-[35px]">
          {Links.map((link, index) => (
            <Link
              to={link.path}
              key={index}
              className={`${
                pathname === link.path
                  ? "relative before:h-[2px] before:left-[-2px] before:bg-primary before:absolute before:bottom-[-18px] before:w-[115%]"
                  : "relative"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto relative">
        {/* Notifications */}
        <div className="relative">
          <span className="w-[14px] h-[14px] absolute right-[-1px] top-[-4px] flex justify-center items-center text-white rounded-full font-Cabin bg-[#F31260] text-[10px] font-bold">
            0
          </span>
          <IoNotifications className="cursor-pointer" size={22} color="white" />
        </div>

        {/* Avatar with Dropdown */}
        <div className="relative" ref={avatarRef}>
          <button
            onClick={toggleAvatarMenu}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-9 h-9 border-[#C7C7C7] border-[2px] bg-[#181D2C] flex items-center justify-center rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={user?.profilePic}
                alt="User Avatar"
              />
            </div>
            <p className="text-[14px] md:text-[15.5px] text-white hidden sm:block">
              {user?.fullname?.split(" ")[0]}
            </p>
          </button>

          {/* Dropdown Menu */}
          {avatarMenuOpen && (
            <div className="absolute right-0 mt-2 w-[130px] bg-[#2e2e2e] border border-gray-700 rounded-md shadow-lg py-2 text-sm text-white z-50">
              <button
                onClick={() => {
                  setAvatarMenuOpen(false);
                  // Add your logout logic here
                  logout();
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#3a3a3a] transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Buttons */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-white focus:outline-none ml-1"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        <button
          onClick={toggleSidebar}
          className="sm:hidden text-white focus:outline-none ml-2"
          aria-label="Toggle Sidebar"
        >
          <FaEllipsisV size={18} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-[#2e2e2e] text-white sm:hidden flex flex-col items-start gap-4 px-6 py-4 z-40 shadow-md">
          {Links.map((link, index) => (
            <Link
              to={link.path}
              key={index}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium ${
                pathname === link.path ? "text-primary" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserNav;
