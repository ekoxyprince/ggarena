import React from "react";
import { Tabs, Tab } from "@heroui/react";
import TournamentOverview from "../../Pages/dashboard/TournamentOverview";
import TournamentLeaderboard from "../../Pages/dashboard/TournamentLeaderboard";
import TournamentBracket from "../../Pages/dashboard/TournamentBracket";
import TournamentFixtures from "../../Pages/dashboard/TournamentFixtures";

function TournamentMenus({}) {
  const handleTabClick = (key) => {};

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
        <Tab key="Overview" title="Overview">
          <TournamentOverview />
        </Tab>
        <Tab key="Leaderboard" title="Leaderboard">
          <TournamentLeaderboard />
        </Tab>
        <Tab key="Bracket" title="Bracket">
          <TournamentBracket />
        </Tab>
        <Tab key="Fixtures" title="Fixtures">
          <TournamentFixtures />
        </Tab>
      </Tabs>
    </div>
  );
}

export default TournamentMenus;
