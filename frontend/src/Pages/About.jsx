import React from "react";
import Section from "../Components/Section";
import { Images } from "../assets/Images";
import CustomButton from "../Components/CustomButton";
import { Link } from "react-router-dom";
import {
  FaDiscord,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaLink,
} from "react-icons/fa";

function About() {
  return (
    <div className="bg-[#0B0816] text-white pt-[90px] pb-[60px] min-h-screen">
      {/* Who We Are */}
      <Section className="max-w-5xl mx-auto flex flex-col gap-6 px-4 sm:px-6">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FFD700] font-semibold text-center sm:text-left">
          About Us
        </p>
        <h1 className="font-Oxanium font-semibold text-[30px] sm:text-[40px] md:text-[46px] leading-tight text-center sm:text-left">
          Who We Are
        </h1>
        <p className="font-syne text-[15px] sm:text-[16px] text-white/85 leading-relaxed">
          GG Arena is an international esports brand built to connect
          communities, creators, and competitors across all continents. We’re
          more than tournaments, we’re building a digital home for gaming
          communities.
        </p>
        <p className="font-syne text-[15px] sm:text-[16px] text-white/80 leading-relaxed">
          We’ve organized and supported offline and online esports events across
          multiple continents, from large expo tournaments to long-running Pro
          Clubs leagues and CODM competitions.
        </p>
        <p className="font-syne text-[15px] sm:text-[16px] text-white/80 leading-relaxed">
          Our goal is simple:{" "}
          <span className="font-semibold">
            Make competitive gaming accessible, organized, and rewarding, while
            giving communities the tools to grow, interact, and build their own
            identity.
          </span>
        </p>
        <p className="font-syne text-[15px] sm:text-[16px] text-white/80 leading-relaxed">
          GG Arena is where players compete, creators shine, communities grow,
          and esports becomes a movement not just an event.
        </p>
      </Section>

      {/* What We Do */}
      <Section className="max-w-5xl mx-auto mt-[40px] flex flex-col gap-10 px-4 sm:px-6">
        <h2 className="font-Oxanium text-[22px] sm:text-[26px] font-semibold mb-2">
          What We Do
        </h2>

        {/* 1. Offline Events & Game Expo Activations */}
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            <h3 className="font-Oxanium text-[18px] sm:text-[20px] font-semibold">
              1. Offline Events &amp; Game Expo Activations
            </h3>
            <p className="font-syne text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
              We’ve organized and supported multiple offline events across
              Nigeria including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[14px] sm:text-[15px] text-white/80">
              <li>₦500,000 EA FC &amp; Mortal Kombat tournaments</li>
              <li>
                National gaming expos with hundreds of players and spectators
              </li>
              <li>Creator meetups and community activations</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3 order-1 lg:order-2">
            <img
              src={Images.about1}
              alt="Offline tournament event"
              className="w-full h-[150px] sm:h-[190px] rounded-2xl object-cover"
            />
            <img
              src={Images.about2}
              alt="Gaming expo activation"
              className="w-full h-[150px] sm:h-[190px] rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* 2. Pro Clubs League (Season 1–3) */}
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div className="order-1">
            <img
              src={Images.about3}
              alt="Pro Clubs League action"
              className="w-full h-[190px] sm:h-[230px] rounded-2xl object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 order-2">
            <h3 className="font-Oxanium text-[18px] sm:text-[20px] font-semibold">
              2. Pro Clubs League (Season 1–3)
            </h3>
            <p className="font-syne text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
              We’ve built one of the most consistent Pro Clubs systems in NA/EU,
              with:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[14px] sm:text-[15px] text-white/80">
              <li>3 seasons</li>
              <li>13+ teams per season</li>
              <li>Prize pools, MVP awards, Golden Boot, weekly highlights</li>
              <li>Storylines, match recaps, and community engagement</li>
            </ul>
            <p className="font-syne text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
              This league is now a core part of the GG Arena identity.
            </p>
          </div>
        </div>

        {/* 3. CODM Community Engagement */}
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            <h3 className="font-Oxanium text-[18px] sm:text-[20px] font-semibold">
              3. CODM Community Engagement
            </h3>
            <p className="font-syne text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
              We’ve maintained a consistent CODM presence with:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[14px] sm:text-[15px] text-white/80">
              <li>Monthly scrims</li>
              <li>Community tournaments</li>
              <li>Cross-region participation</li>
            </ul>
            <p className="font-syne text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
              This is the start of our mobile esports expansion.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src={Images.about4}
              alt="CODM community engagement"
              className="w-full h-[190px] sm:h-[230px] rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* 4. Creator & Media Content */}
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div className="order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <img
                src={Images.about5}
                alt="Creator and media content 1"
                className="w-full h-[160px] sm:h-[190px] rounded-2xl object-cover"
              />
              <img
                src={Images.about6}
                alt="Creator and media content 2"
                className="w-full h-[160px] sm:h-[190px] rounded-2xl object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 order-2">
            <h3 className="font-Oxanium text-[18px] sm:text-[20px] font-semibold">
              4. Creator &amp; Media Content
            </h3>
            <p className="font-syne text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
              We produce:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[14px] sm:text-[15px] text-white/80">
              <li>Player highlights</li>
              <li>Live coverage</li>
              <li>Interviews</li>
              <li>Social content around players, clubs, and events</li>
            </ul>
            <p className="font-syne text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
              Your creative output shows fans and sponsors that GG Arena doesn’t
              just host matches — you create stories.
            </p>
          </div>
        </div>
      </Section>

      {/* Our Vision */}
      <Section className="max-w-5xl mx-auto mt-[50px] flex flex-col gap-4 px-4 sm:px-6">
        <h2 className="font-Oxanium text-[22px] sm:text-[26px] font-semibold">
          Our Vision
        </h2>
        <p className="font-syne text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
          A connected esports network that supports Africa and the global gaming
          scene through:
        </p>
        <ul className="list-disc list-inside space-y-1 text-[14px] sm:text-[15px] text-white/80">
          <li>Technology</li>
          <li>Community</li>
          <li>Competitions</li>
          <li>Opportunities for creators &amp; pro players</li>
        </ul>
      </Section>

      {/* Connect With Us */}
      <Section className="max-w-5xl mx-auto mt-[40px] flex flex-col gap-4 px-4 sm:px-6">
        <h2 className="font-Oxanium text-[22px] sm:text-[26px] font-semibold">
          Connect With Us
        </h2>
        <p className="font-syne text-[14px] sm:text-[15px] text-white/80">
          Stay plugged into everything GG Arena is building across tournaments,
          creators, and community events.
        </p>
        <div className="flex flex-wrap gap-3 mt-2">
          <a
            href="https://linktr.ee/ggarena100"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD700]/60 text-[13px] sm:text-[14px] text-white/90 hover:bg-[#FFD700]/10 transition-colors"
          >
            <FaLink className="text-[#FFD700]" />
            <span>Linktree</span>
          </a>
          <a
            href="https://discord.gg/Vpa9TBg2Uy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#5865F2]/60 text-[13px] sm:text-[14px] text-white/90 hover:bg-[#5865F2]/20 transition-colors"
          >
            <FaDiscord className="text-[#5865F2]" />
            <span>Discord</span>
          </a>
          <a
            href="https://www.youtube.com/@ggarenaesport"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-[13px] sm:text-[14px] text-white/90 hover:bg-white/10 transition-colors"
          >
            <FaYoutube className="text-[#FF0000]" />
            <span>YouTube</span>
          </a>
          <a
            href="https://x.com/ggarenaesport?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-[13px] sm:text-[14px] text-white/90 hover:bg-white/10 transition-colors"
          >
            <FaTwitter className="text-[#e5e5e5]" />
            <span>X (Twitter)</span>
          </a>
          <a
            href="https://www.instagram.com/ggarenaesport?igsh=MWZicnd4OXM5MGxmNQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-[13px] sm:text-[14px] text-white/90 hover:bg-white/10 transition-colors"
          >
            <FaInstagram className="text-pink-400" />
            <span>Instagram</span>
          </a>
        </div>
      </Section>
    </div>
  );
}

export default About;
