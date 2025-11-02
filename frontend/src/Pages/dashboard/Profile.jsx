import Layout from "../../Components/ui/Layout";
import OverviewCard from "../../Components/ui/OverviewCard";
import ic1 from "../../assets/Images/svg2.svg";
import tournament from "../../assets/Images/tournament.png";
import trophy from "../../assets/Images/trophy.png";
import community from "../../assets/Images/community.png";
import created from "../../assets/Images/social-care.png";
import { Images } from "../../assets/Images";
import { Tooltip } from "antd";
import { FaCamera } from "react-icons/fa6";
import ProfileMenus from "../../Components/ui/ProfileMenus";
import ProfileImgUploader from "../../Components/ui/ProfileImgUploader";
import BannerImgUpload from "../../Components/ui/BannerImgUpload";
import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const { userData, refetchUser } = useOutletContext();
  console.log("ctx", userData);
  return (
    <div className="">
      <BannerImgUpload showUpdate={false} />
      <div>
        <div className="relative mx-auto max-w-[560px] z-10 flex flex-col items-center h-full text-white text-center px-4 -mt-[160px]">
          <ProfileImgUploader refetch={refetchUser} user={userData} />
          <span className="text-[13px] uppercase text-primary">
            {userData?.role}
          </span>
          <h2 className="text-[45px] font-bold font-Poppins">
            {userData?.fullname}
          </h2>
          {/* <div className="flex justify-center items-center gap-2">
            <p className="flex items-center gap-2 text-center">
              <div className=" w-[11px] h-[11px] rounded-full !mb-0 bg-[#40B457]"></div>{" "}
              Active now
            </p>
            <p className="text-[15px] flex items-center gap-1 text-center">
              <div className=" w-[5px] h-[5px] rounded-full !mb-0 bg-primary"></div>
              Signed up 4 months ago
            </p>
          </div> */}
        </div>
        <Layout>
          <div className=" w-full mt-[40px]">
            <div className="mt-2 grid grid-cols-2 lg:grid-cols-4 gap-3">
              <OverviewCard
                img={ic1}
                title={"Tournaments Created"}
                amount={userData?.tournamentsCreated}
              />
              <OverviewCard
                img={trophy}
                title={"Tournaments Won"}
                amount={userData?.tournamentsWon}
              />
              <OverviewCard
                img={community}
                title={"Communities Joined"}
                amount={userData?.communitiesJoined}
              />
              <OverviewCard
                img={created}
                title={"Communities Created"}
                amount={userData?.communitiesCreated}
              />
            </div>
          </div>
        </Layout>
        <ProfileMenus userData={userData} />
      </div>
    </div>
  );
}
