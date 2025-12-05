import React, { useState, useEffect, useRef } from "react";
import { Images } from "../assets/Images";
import { FaBars, FaTimes, FaWallet } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useGlobalContext } from "../contexts/GlobalContext";

function UserNav({ user }) {
  const { pathname } = useLocation();
  const { setNavOpen } = useGlobalContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const toggleAvatarMenu = () => setAvatarMenuOpen((prev) => !prev);

  // Close avatar dropdown when clicking outside
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
    <div className="min-w-full bg-[#2e2e2e] fixed top-0 h-[60px] px-4 md:px-6 flex items-center justify-between z-50">
      {/* LEFT: Logo */}
      <Link to={"/account"} className="flex items-center shrink-0">
        <img className="w-[28px] md:w-[29px]" src={Images.logoIc} alt="Logo" />
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 ml-auto relative">
        {/* Desktop Links */}
        <ul className="hidden sm:flex text-[14px] md:text-[15.5px] text-white font-light items-center gap-6 mr-4">
          {Links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`${
                pathname === link.path
                  ? "relative before:h-[2px] before:bg-primary before:absolute before:bottom-[-6px] before:w-full"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </ul>

        {/* RIGHT-SIDE WALLET (replaces notifications) */}
        <div className="flex items-center gap-2 bg-[#181D2C] px-4 py-2 rounded-full border border-[#3a3a3a] w-fit">
          <FaWallet className="text-primary" size={20} />
          <span className="text-primary text-[16px] font-semibold">
            {user?.points ?? 0}
          </span>
        </div>

        {/* Avatar */}
        <div className="relative" ref={avatarRef}>
          <button
            onClick={toggleAvatarMenu}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 border-[#C7C7C7] border-[2px] bg-[#181D2C] rounded-full overflow-hidden">
              <img
                src={user?.profilePic}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white text-[14px] hidden sm:block">
              {user?.fullname?.split(" ")[0]}
            </p>
          </button>

          {avatarMenuOpen && (
            <div className="absolute right-0 mt-2 w-[130px] bg-[#2e2e2e] border border-gray-700 rounded-md shadow-lg py-2 text-sm text-white z-50">
              <button
                onClick={() => {
                  setAvatarMenuOpen(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#3a3a3a]"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="sm:hidden text-white">
          {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-[#2e2e2e] text-white sm:hidden flex flex-col gap-4 px-6 py-4 shadow-md">
          {Links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
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
