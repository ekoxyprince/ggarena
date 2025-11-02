import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Preloader from "./ui/Preloader";


const RouteChangeLoader = ({ children }) => {
    const location = useLocation();
    const [showLoader, setShowLoader] = useState(false);
    const [displayContent, setDisplayContent] = useState(true);

    useEffect(() => {
      setShowLoader(true);
      setDisplayContent(false);

      const timer = setTimeout(() => {
        setShowLoader(false);
        setDisplayContent(true);
      }, 2500);

      return () => clearTimeout(timer);
    }, [location.pathname]);

  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <Preloader />
        </div>
      )}

      {displayContent && <div className="relative z-0">{children}</div>}
    </>
  );
};

export default RouteChangeLoader;
