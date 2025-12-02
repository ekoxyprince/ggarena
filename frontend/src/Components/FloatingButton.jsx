import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { MdGroups3 } from "react-icons/md";

function FloatingButton() {
  const { setNavOpen } = useGlobalContext();
  return (
    <button
      onClick={() => setNavOpen()}
      class="fixed md:hidden bottom-[100px] right-6 w-14 h-14 rounded-full bg-[rgba(225,225,225,0.1)] text-white flex items-center justify-center shadow-lg hover:bg-secondary transition z-10"
    >
      <MdGroups3 color="#fff" size={28} />
    </button>
  );
}

export default FloatingButton;
