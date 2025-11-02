import { Link } from "react-router-dom";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

export default function CommunityLink({ name, image, url }) {
  const { pathname } = useLocation();
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      to={url}
      className="flex items-center space-x-2 px-1 py-1 rounded-lg relative"
    >
      <span
        ref={linkRef}
        className={`w-[3px] ${
          url == pathname ? `h-[30px]` : "h-[8px]"
        } bg-primary ease-linear duration-200 absolute left-0 rounded-r-[10px] top-[50%] translate-y-[-50%]`}
      ></span>
      <div className="w-[3rem] h-[3rem]">
        <img className="w-full h-full rounded-full" src={image} alt="" />
      </div>
      <p className="text-[14px]">{name}</p>
    </Link>
  );
}
