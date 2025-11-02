import React, { useState } from "react";
import { Images } from "../assets/Images";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      id="header"
      className="w-full py-[15px] px-4 sm:px-[30px] md:px-[60px] shadow-xl flex justify-between items-center bg-[#0e0e0e] relative z-50"
    >
      {/* Logo */}
      <Link to="/" className="shrink-0">
        <img
          src={Images.logo}
          alt="Logo"
          className="logo w-[6rem] sm:w-[7rem] md:w-[7.5rem]"
        />
      </Link>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex gap-3 items-center">
        <Link to="/login">
          <CustomButton
            text="Log In"
            className="bg-transparent border-[2px] border-[#d4ac3f] w-24 text-white"
          />
        </Link>
        <Link to="/signup">
          <CustomButton text="Sign Up" className="btt text-secondary w-24" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="sm:hidden text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-nav flex flex-col items-center gap-4 py-4 sm:hidden shadow-md animate-slideDown">
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="w-[85%] text-center"
          >
            <CustomButton
              text="Log In"
              className="bg-transparent border-[2px] border-[#d4ac3f] w-full text-white"
            />
          </Link>
          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="w-[85%] text-center"
          >
            <CustomButton
              text="Sign Up"
              className="btt text-secondary w-full"
            />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
