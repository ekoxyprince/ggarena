import logo from "../../src/assets/Images/Logo.png";
import SidebarLink from "./SidebarLink";
import Links from "../constants/Links";
import { IoMdAddCircle } from "react-icons/io";
import CommunityLink from "./CommunityLink";
import Community from "../constants/Community";
import { useGlobalContext } from "../contexts/GlobalContext";
import { IoAddOutline } from "react-icons/io5";

export default function UserSidebar() {
  const { isNavOpen, setNavOpen, controlCommunityModal } = useGlobalContext();
  return (
    <div
      className={`h-[100vh] w-[18rem]  md:w-[15rem] ${
        isNavOpen ? "left-0" : "left-[-20rem] md:left-0"
      } fixed md:relative z-40 ease-linear duration-200`}
    >
      <div
        className={`md:hidden fixed top-0 left-0 right-0 bottom-0 ${
          isNavOpen ? "w-full" : "w-0"
        } h-[100vh] bg-[rgba(0,0,0,0.65)] z-20 ease-linear duration-300`}
        onClick={setNavOpen}
      ></div>
      <aside className="h-[100vh] w-[18rem] md:w-[15rem] flex flex-col p-4 pt-3 px-4 space-y-2 bg-[#262626] hoi fixed z-40">
        <div className="w-[8rem] h-[2.5rem] flex items-center justify-center">
          <img src={logo} alt="" />
        </div>
        <div className="w-full">
          <h2 className="uppercase text-[11px] opacity-45 ml-1">main</h2>
          <div className="mt-1">
            <div className="flex flex-col space-y-3">
              {Links.map((l, i) => {
                return (
                  <SidebarLink
                    key={`index-${i}`}
                    Icon={l.Icon}
                    text={l.text}
                    url={l.url}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="uppercase text-[11px] opacity-45 ml-3">
              Communities
            </h2>
            <div className="w-[25px] h-[25px] rounded-full flex items-center justify-center border-primary border-1">
              <IoAddOutline
                className="cursor-pointer hover:opacity-45"
                color="white"
                size={15}
                onClick={() => {
                  controlCommunityModal();
                  setNavOpen();
                }}
              />
            </div>
          </div>
          <div className="mt-1 h-[32rem] md:h-[22rem] overflow-y-scroll scroll-container md:pb-[20px]">
            <div className="flex flex-col space-y-1">
              {Community.map((c, i) => {
                return (
                  <CommunityLink
                    key={`index-${i}`}
                    name={c.name}
                    url={c.url}
                    image={c.image}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
