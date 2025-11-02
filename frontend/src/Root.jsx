import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import RouteChangeLoader from "./Components/RouteChangeLoader";
import Preloader from "./Components/ui/Preloader";

function Root() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Navbar />
      <RouteChangeLoader>
        <Outlet />
      </RouteChangeLoader>
      <Footer />
    </div>
  );
}

export default Root;
