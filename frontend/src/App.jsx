import { useEffect, useState } from "react";
import "./App.css";
// import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
// import { DatePicker } from "antd";
import { ConfigProvider, theme } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "../routes";
import Preloader from "./Components/ui/Preloader";
import RouteChangeLoader from "./Components/RouteChangeLoader";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // 👈 default to dark
  useEffect(() => {
    // Set Tailwind dark mode class on <html>
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <QueryClientProvider client={client}>
      <main className="bg-[#0B0816]">
        <ConfigProvider
          theme={{
            algorithm: isDarkMode
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          }}
        >
          <RouterProvider router={router} />
          <Toaster />
        </ConfigProvider>
      </main>
    </QueryClientProvider>
  );
}

export default App;
