import { Link } from "react-router-dom";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "./src/contexts/GlobalContext";

export default function SidebarLink({ text, Icon, url, }) {
  const { pathname } = useLocation();
  const { setNavOpen } = useGlobalContext();
  const linkRef = useRef(null);
  function handleMouseEnter() {
    const classList = linkRef.current?.classList;
    if (!classList.contains("h-[30px]")) {
      linkRef.current?.classList.remove("h-[8px]");
      linkRef.current?.classList.add("h-[20px]");
    }
  }
  function handleMouseLeave() {
    const classList = linkRef.current?.classList;
    if (!classList.contains("h-[30px]")) {
      linkRef.current?.classList.remove("h-[20px]");
      linkRef.current?.classList.add("h-[8px]");
    }
  }
  return (
    <Link
      onClick={setNavOpen}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      to={url}
      className="flex items-center space-x-2 px-[0.5px] py-2 rounded-lg relative"
    >
      <span
        ref={linkRef}
        className={`w-[3px] ${
          url == pathname
            ? `h-[20px] bg-primary ease-linear duration-200 absolute left-0 rounded-r-[10px] top-[50%] translate-y-[-50%]`
            : "h-[8px] bg-transparent absolute left-0 rounded-r-[10px] top-[50%] translate-y-[-50%]"
        } `}
      ></span>
      <Icon size={23} className={`${
        url == pathname ? "text-primary" : "text-white"
      }`} />
      <p className="text-[15px] font-medium">{text}</p>
    </Link>
  );
}
