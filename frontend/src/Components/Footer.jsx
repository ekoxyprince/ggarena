import React from "react";
import { Link } from "react-router-dom";
import { Images } from "../assets/Images";
import { FaDiscord, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal text-neutral-content items-center px-4 sm:px-[30px] md:px-[60px] py-4 flex flex-row sm:flex-row gap-4 sm:gap-0 justify-between">
      <aside className="grid-flow-col items-center justify-center sm:justify-start">
        <Link to="/">
          <img src={Images.logo} alt="" className="logo w-[7.5rem]" />
        </Link>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end flex items-center">
        {/* X / Twitter */}
        <a
          href="https://x.com/ggarenaesport?s=21"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="hover:text-[#ffd700] transition-colors"
        >
          <FaTwitter size={20} />
        </a>
        {/* YouTube */}
        <a
          href="https://www.youtube.com/@ggarenaesport"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="hover:text-[#ffd700] transition-colors"
        >
          <FaYoutube size={20} />
        </a>
        {/* Instagram */}
        <a
          href="https://www.instagram.com/ggarenaesport?igsh=MWZicnd4OXM5MGxmNQ=="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-[#ffd700] transition-colors"
        >
          <FaInstagram size={20} />
        </a>
        {/* Discord */}
        <a
          href="https://discord.gg/Vpa9TBg2Uy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          className="hover:text-[#ffd700] transition-colors"
        >
          <FaDiscord size={20} />
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
