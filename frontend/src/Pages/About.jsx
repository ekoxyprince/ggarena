import React from 'react';
import Section from "../Components/Section";
import { Images } from "../assets/Images";
import CustomButton from "../Components/CustomButton";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-[#0B0816] text-white pt-[90px] pb-[60px] min-h-screen">
      {/* Hero / Intro */}
      <Section className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 flex flex-col gap-4 text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-[#FFD700] font-semibold">
              About GG Arena Esports
            </p>
            <h1 className="font-Oxanium font-semibold text-[32px] sm:text-[42px] md:text-[50px] leading-tight">
              Powering the next generation of competitive gaming.
            </h1>
            <p className="font-syne text-[15px] sm:text-[17px] text-white/85 max-w-xl mx-auto lg:mx-0">
              GG Arena is built for players, communities, and organizers who want
              tournaments that are fast, fair, and truly global. From weekend
              scrims to pro‑level events, we handle the hard parts so you can
              focus on the game.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
              <Link to="/signup">
                <CustomButton
                  text="Get Started"
                  className="btt text-secondary w-[150px] h-[46px] font-syne text-[0.9rem] font-extrabold uppercase"
                />
              </Link>
              <a
                href="https://discord.gg/Vpa9TBg2Uy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="lin-btn bg-transparent !text-white border border-[#FFD700] px-6 py-2 rounded-xl text-[0.9rem] font-medium">
                  Join our Discord
                </button>
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden holographic-card">
              <img
                src={Images.about}
                alt="Players competing in an esports tournament"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Stats / Highlights */}
      <Section className="max-w-6xl mx-auto mt-[40px]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-card rounded-xl p-5 text-center flex flex-col gap-1">
            <p className="text-[28px] sm:text-[32px] font-bold text-[#FFD700]">
              10K+
            </p>
            <p className="text-[14px] sm:text-[15px] text-white/80">Registered players</p>
            <p className="text-[13px] text-white/60">
              Growing community of casual and competitive gamers across multiple titles.
            </p>
          </div>

          <div className="bg-card rounded-xl p-5 text-center flex flex-col gap-1">
            <p className="text-[28px] sm:text-[32px] font-bold text-[#FFD700]">
              500+
            </p>
            <p className="text-[14px] sm:text-[15px] text-white/80">Tournaments hosted</p>
            <p className="text-[13px] text-white/60">
              From grassroots cups to seasonal leagues organized by trusted hosts.
            </p>
          </div>

          <div className="bg-card rounded-xl p-5 text-center flex flex-col gap-1">
            <p className="text-[28px] sm:text-[32px] font-bold text-[#FFD700]">
              24/7
            </p>
            <p className="text-[14px] sm:text-[15px] text-white/80">Global platform</p>
            <p className="text-[13px] text-white/60">
              Built for international players with secure payments and live tools.
            </p>
          </div>
        </div>
      </Section>

      {/* Mission & Values */}
      <Section className="max-w-6xl mx-auto mt-[50px] flex flex-col lg:flex-row gap-10 items-start">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="font-Oxanium text-[24px] sm:text-[28px] font-semibold">
            Our mission
          </h2>
          <p className="font-syne text-[15px] sm:text-[16px] text-white/80 leading-relaxed">
            We’re on a mission to make esports accessible to everyone. Whether
            you’re a solo grinder, a team captain, or a community manager, GG
            Arena gives you the tools to create, manage, and grow tournaments
            without needing a full dev team behind you.
          </p>
          <p className="font-syne text-[15px] sm:text-[16px] text-white/80 leading-relaxed">
            Transparency, competitive integrity, and community are at the core of
            what we build. We’re constantly iterating with feedback from players
            and organizers to keep the experience smooth and rewarding.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="gradient-border-box h-full flex flex-col gap-2 justify-between">
            <h3 className="text-[16px] font-semibold text-[#FFD700]">For Players</h3>
            <p className="text-[14px] text-white/80">
              Discover new tournaments, join in a few clicks, track your results,
              and get rewarded instantly when you win.
            </p>
          </div>
          <div className="gradient-border-box h-full flex flex-col gap-2 justify-between">
            <h3 className="text-[16px] font-semibold text-[#FFD700]">
              For Organizers
            </h3>
            <p className="text-[14px] text-white/80">
              Automate brackets, payouts, and communications so you can spend more
              time growing your community.
            </p>
          </div>
          <div className="gradient-border-box h-full flex flex-col gap-2 justify-between">
            <h3 className="text-[16px] font-semibold text-[#FFD700]">
              For Communities
            </h3>
            <p className="text-[14px] text-white/80">
              Build hubs around your favorite titles, with events, announcements,
              and Discord integrations that keep everyone engaged.
            </p>
          </div>
          <div className="gradient-border-box h-full flex flex-col gap-2 justify-between">
            <h3 className="text-[16px] font-semibold text-[#FFD700]">
              For Brands & Partners
            </h3>
            <p className="text-[14px] text-white/80">
              Reach highly engaged players with sponsored events, prize pools, and
              custom campaigns.
            </p>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="max-w-4xl mx-auto mt-[60px] text-center">
        <div className="rounded-2xl bg-radial-main py-10 px-6 flex flex-col gap-4 items-center">
          <h2 className="font-Oxanium text-[24px] sm:text-[30px] font-semibold">
            Ready to host or join your next tournament?
          </h2>
          <p className="font-syne text-[14px] sm:text-[16px] text-white/80 max-w-2xl">
            Start for free in minutes. Create your first event, invite your
            community, and let GG Arena handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link to="/signup">
              <CustomButton
                text="Create an account"
                className="btt text-secondary w-[190px] h-[48px] font-syne text-[0.9rem] font-extrabold uppercase"
              />
            </Link>
            <Link to="/login">
              <button className="lin-btn bg-transparent !text-white border border-[#FFD700] px-6 py-2 rounded-xl text-[0.9rem] font-medium">
                Log in instead
              </button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default About
