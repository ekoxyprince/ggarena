import { RxDashboard } from "react-icons/rx";
import { FaUserEdit } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdLeaderboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
export default [
  {
    url: "/user/account",
    Icon: RxDashboard,
    text: "Dashboard",
  },
  {
    url: "/user/leaderboard",
    Icon: MdLeaderboard,
    text: "Leaderboards",
  },
  {
    url: "/user/Communities",
    Icon: FaUsers,
    text: "Communities",
  },
  {
    url: "/user/settings",
    Icon: FaUserEdit,
    text: "Profile",
  },
  {
    url: "/user/support",
    Icon: BiSupport,
    text: "Support",
  },
];
