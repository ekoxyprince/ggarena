import React from "react";
import Layout from "./Layout";
import { Tabs, Tab } from "@heroui/react";
import CommunityHome from "../../Pages/dashboard/CommunityHome";
import { CiSearch } from "react-icons/ci";
import TornamentCard from "./TornamentCard";
import Tors from "../../constants/Tors";
import { Select, Input } from "antd";
import ChatInput from "./ChatInput";
import CommunityChat from "../../Pages/Dashboard/CommunityChat";
import CommunityAbout from "../../Pages/dashboard/CommunityAbout";
import CommunityTournament from "./CommunityTournament";
import Marketplace from "../../Pages/dashboard/Marketplace";
function CommunityMenus({ hideTop, setHideTop }) {
  const handleTabClick = (key) => {
    if (
      key === "Tournaments" ||
      key === "Chat Room" ||
      key === "About" ||
      key === "Settings" ||
      key === "Marketplace"
    ) {
      setHideTop(true);
    } else {
      setHideTop(false);
    }
  };
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <div className=" pb-[50px]">
      <Tabs
        aria-label="Tabs variants"
        variant={"underlined"}
        className="w-full"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider w-full",
          cursor: "w-full bg-primary",
          tab: " text-[16px] font-semibold !text-secondary !border-b-2 border-transparent hover:!border-primary hover:!text-primary",
          tabContent: "group-data-[selected=true]:text-primary text-white",
        }}
        color="primary"
        onSelectionChange={handleTabClick}
      >
        <Tab key="Home" title="Home">
          <CommunityHome />
        </Tab>
        <Tab key="Tournaments" title="Tournaments">
          <CommunityTournament />
        </Tab>
        <Tab key="Chat Room" title="Chat Room">
          <CommunityChat />
        </Tab>
        {/* <Tab key="Marketplace" title="Marketplace" >
          <Marketplace />
        </Tab> */}
        <Tab key="About" title="About">
          <CommunityAbout />
        </Tab>
        {/* <Tab key="Settings" title="Settings">
          <p className="text-gray-500">No photos available</p>
        </Tab> */}
      </Tabs>
    </div>
  );
}

export default CommunityMenus;
