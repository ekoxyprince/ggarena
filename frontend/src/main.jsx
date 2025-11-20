import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProductProvider } from "./contexts/ProductsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <HeroUIProvider>
          <main className="dark text-foreground ">
            <App />
          </main>
        </HeroUIProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);
