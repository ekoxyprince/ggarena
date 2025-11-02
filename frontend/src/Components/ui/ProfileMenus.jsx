import React from "react";
// import { Tabs } from "antd";
import Layout from "./Layout";
import { Tabs, Tab } from "@heroui/react";
import UserTournments from "../../Pages/dashboard/UserTournments";
import UserCommunities from "../../Pages/dashboard/UserCommunities";
import LeaderBoard from "../../Pages/dashboard/LeaderBoard";
import Settings from "../../Pages/dashboard/Settings";
function ProfileMenus({ userData }) {
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
    <div className="mt-[50px] pb-[50px]">
      <Layout>
        <Tabs
          aria-label="Tabs variants"
          variant={"underlined"}
          fullWidth
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider w-full",
            cursor: "w-full bg-primary",
            tab: " text-[16px] font-semibold !text-secondary !border-b-2 border-transparent hover:!border-primary hover:!text-primary",
            tabContent: "group-data-[selected=true]:text-primary text-white",
          }}
          color="primary"
        >
          <Tab key="Tournaments" title="Tournaments">
            <UserTournments tournaments={userData?.tournaments} />
          </Tab>
          <Tab key="Communities" title="Communities">
            <UserCommunities data={userData?.communities} />
          </Tab>
          <Tab key="leaderboard" title="leaderboard">
            <LeaderBoard />
          </Tab>
          <Tab key="Details" title="Details">
            <Settings user={userData} />
          </Tab>
        </Tabs>
        {/* <Tabs color='#2e2e2e' defaultActiveKey="1" items={items} /> */}
      </Layout>
    </div>
  );
}

export default ProfileMenus;
