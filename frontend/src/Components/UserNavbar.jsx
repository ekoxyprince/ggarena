import { FaSearch } from "react-icons/fa";
import pic from "../assets/Images/download.jpg";
import { RiMenuUnfold4Fill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { useGlobalContext } from "../contexts/GlobalContext";
export default function UserNavbar() {
  const { setNavOpen } = useGlobalContext();
  return (
    <nav className="h-[3.5rem] w-full border rounded-xl border-[#FFD700] flex items-center justify-between p-2 px-4 py-2">
      <div className="w-[12rem] md:w-[22rem] h-[2rem] relative">
        <input
          className="w-full h-full border-none outline-none rounded-md px-7"
          type="text"
          placeholder="Search Community"
        />
        <FaSearch className="absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer hover:opacity-45" />
      </div>
      <div className="flex space-x-2 items-center">
        <IoNotificationsOutline
          className="cursor-pointer hover:opacity-45"
          size={25}
          color="white"
        />
        <RiMenuUnfold4Fill
          className="block md:hidden cursor-pointer hover:opacity-45"
          size={25}
          color="white"
          onClick={setNavOpen}
        />
        <div className="w-[2rem] h-[2rem]">
          <img className="w-full h-full rounded-full" src={pic} alt="" />
        </div>
      </div>
    </nav>
  );
}
