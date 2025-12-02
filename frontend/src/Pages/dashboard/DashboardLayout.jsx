import React from "react";
import UserNav from "../../Components/UserNav";
import { Outlet } from "react-router-dom";
import UserSideNav from "../../Components/UserSideNav";
import { GlobalProvider } from "../../contexts/GlobalContext";
import useFetch from "../../hooks/useFetch";
import FloatingButton from "../../Components/FloatingButton";

function DashboardLayout() {
  const { data, refetch } = useFetch({
    key: "user-details",
    url: "/api/user/details",
  });
  return (
    <GlobalProvider>
      <div className="w-[100%]">
        <FloatingButton />
        <UserNav user={data} />
        <div className="dashboard-content bg-red !bg-[#1F1F1F] min-h-screen w-full">
          <UserSideNav user={data} />
          <div className="content-area mx-auto">
            <Outlet context={{ userData: data, refetchUser: refetch }} />
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default DashboardLayout;
