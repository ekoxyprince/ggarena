import React from "react";
import Layout from "../../Components/ui/Layout";
import TornamentCard from "../../Components/ui/TornamentCard";

function UserTournments({ tournaments }) {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[15px]">
        {tournaments?.map((data, index) => {
          return <TornamentCard key={index} data={data} />;
        })}
      </div>
    </Layout>
  );
}

export default UserTournments;
