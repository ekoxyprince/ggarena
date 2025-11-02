import UserSidebar from "../../Components/UserSidebar";
import { Outlet } from "react-router-dom";
import UserNavbar from "../../Components/UserNavbar";
import { GlobalProvider } from "../../contexts/GlobalContext";
import CommunityModal from "../../Components/ui/CommunityModal";
import CustomModal from "../../Components/ui/CustomModal";
export default function DashboardLayout() {
  return (
    <GlobalProvider>
      <CommunityModal />
      <div className="grid dash-lg-grid">
        <UserSidebar />
        <div className="flex flex-col space-y-4 p-[1px] px-[2px] md:p-2 py-2 Md:px-4">
          <UserNavbar />
          <Outlet />
        </div>
      </div>
    </GlobalProvider>
  );
}
