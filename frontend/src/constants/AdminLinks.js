import { FaChartPie } from "react-icons/fa";
import { FaXbox } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { RiUserCommunityLine } from "react-icons/ri";
import { TbTournament } from "react-icons/tb";
import { GiClothes } from "react-icons/gi";
import { IoCartSharp } from "react-icons/io5";

export default [
  {
    title: "Overview",
    Icon: FaChartPie,
    url: "/admin/dashboard",
  },
  {
    title: "Platforms",
    Icon: FaXbox,
    url: "/admin/platforms",
  },
  {
    title: "Games",
    Icon: IoLogoGameControllerB,
    url: "/admin/games",
  },
  {
    title: "Users",
    Icon: FaUsers,
    url: "/admin/users",
  },
  {
    title: "Communities",
    Icon: RiUserCommunityLine,
    url: "/admin/communities",
  },
  {
    title: "Tournaments",
    Icon: TbTournament,
    url: "/admin/tournaments",
  },
  {
    title: "Products",
    Icon: GiClothes,
    url: "/admin/products",
  },
  {
    title: "Orders",
    Icon: IoCartSharp,
    url: "/admin/orders",
  },
];
