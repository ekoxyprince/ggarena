import React from "react";
import Layout from "../../Components/ui/Layout";
import CommunityCard from "../../Components/ui/CommunityCard";

function UserCommunities({ data }) {
  return (
    <Layout>
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-[40px] md:gap-[20px] mt-[15px] pb-[100px] gap-y-[50px] max-w-[100%] w-fit md:space-y-2">
        {data?.map((dt, index) => (
          <CommunityCard key={index} data={dt} />
        ))}
      </div>
    </Layout>
  );
}

export default UserCommunities;
