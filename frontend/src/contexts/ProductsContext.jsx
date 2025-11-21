import React from "react";
import { createContext, useState } from "react";
import prod from "../assets/Images/prod.png";
import prod1 from "../assets/Images/prod1.png";
import prod2 from "../assets/Images/prod2.png";
import prod3 from "../assets/Images/prod3.png";
import prod4 from "../assets/Images/prod4.png";
import prod5 from "../assets/Images/prod5.png";
import prod6 from "../assets/Images/prod6.png";
import comIC1 from "../assets/Images/comIC.webp";
import comIC2 from "../assets/Images/comIC2.webp";
import comIC3 from "../assets/Images/comIC3.webp";
import comIC4 from "../assets/Images/comIC4.webp";
import comIC5 from "../assets/Images/comIC5.webp";
import comIC6 from "../assets/Images/comIC6.webp";
import comIC7 from "../assets/Images/comIC7.webp";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const initial = [
    {
      id: 1,
      name: "ONIKUMA GT808 2.4GHz Wireless Gaming Headset",
      price: "₦20,000",
      image: prod,
      category: "Gaming Headset",
      brand: "ONIKUMA",
      stock: 15,
      com: comIC1,
      shortDescription:
        "A lightweight wireless gaming headset designed for clear communication and immersive sound.",
      longDescription:
        "The ONIKUMA GT808 delivers reliable 2.4GHz wireless audio with deep bass and crystal-clear voice clarity. Built for comfort, it features soft memory-foam ear cushions and a noise-reducing microphone, making it perfect for long gaming sessions across PC, PlayStation, and mobile devices.",
      features: [
        "2.4GHz low-latency wireless connection",
        "Noise-cancelling adjustable microphone",
        "Soft memory-foam ear cushions",
        "20-hour battery life",
        "Deep bass stereo audio",
      ],
    },
    {
      id: 2,
      name: "Logitech G Pro X Gaming Headset",
      price: "₦25,000",
      image: prod1,
      category: "Gaming Headset",
      brand: "Logitech",
      stock: 10,
      com: comIC2,
      shortDescription:
        "A tournament-grade headset with pro-level microphone clarity and precision audio.",
      longDescription:
        "The Logitech G Pro X is built with esports feedback and engineered for competitive performance. Featuring Blue VO!CE microphone technology and next-gen surround sound, it helps players hear footsteps, reloads, and enemy positioning with unmatched detail.",
      features: [
        "Blue VO!CE microphone filters",
        "DTS Headphone:X surround sound",
        "Durable aluminum + steel frame",
        "Detachable pro-grade mic",
        "Soft memory-foam leatherette pads",
      ],
    },
    {
      id: 3,
      name: "Razer DeathAdder V2 Gaming Mouse",
      price: "₦15,000",
      image: prod2,
      category: "Gaming Mouse",
      brand: "Razer",
      stock: 20,
      com: comIC3,
      shortDescription:
        "A lightweight ergonomic gaming mouse designed for speed, accuracy, and comfort.",
      longDescription:
        "The Razer DeathAdder V2 features an award-winning ergonomic design, optical switches, and a high-precision 20K DPI sensor for peak performance. Its lightweight build and textured grips ensure total control, making it ideal for FPS and fast-paced titles.",
      features: [
        "Razer Focus+ 20K DPI sensor",
        "Optical mouse switches",
        "Speedflex drag-free cable",
        "Customizable RGB lighting",
        "Ergonomic right-handed shape",
      ],
    },
    {
      id: 4,
      name: "Corsair K55 RGB Gaming Keyboard",
      price: "₦18,000",
      image: prod3,
      category: "Gaming Keyboard",
      brand: "Corsair",
      stock: 12,
      com: comIC4,
      shortDescription:
        "A quiet, responsive RGB gaming keyboard with customizable lighting and macro keys.",
      longDescription:
        "The Corsair K55 RGB offers dynamic lighting effects, six dedicated macro keys, and quiet membrane keys designed for both work and gaming. It includes media shortcuts, anti-ghosting, and detachable wrist support, delivering comfort and reliability.",
      features: [
        "3-zone RGB backlighting",
        "Six programmable macro keys",
        "Quiet responsive keys",
        "Dedicated media controls",
        "Detachable soft wrist rest",
      ],
    },
    {
      id: 5,
      name: "HyperX Cloud II Gaming Headset",
      price: "₦22,000",
      image: prod4,
      category: "Gaming Headset",
      brand: "HyperX",
      stock: 8,
      com: comIC5,
      shortDescription:
        "A premium comfort headset with rich surround sound and noise-cancelling mic.",
      longDescription:
        "HyperX Cloud II combines plush memory-foam comfort with powerful 53mm drivers for immersive audio. Its noise-cancelling microphone ensures clear communication, while the lightweight aluminum frame offers long-lasting durability for everyday gaming.",
      features: [
        "Virtual 7.1 surround sound",
        "53mm dynamic drivers",
        "Noise-cancelling detachable mic",
        "Lightweight aluminum frame",
        "Extra-soft memory-foam cushioning",
      ],
    },
    {
      id: 6,
      name: "SteelSeries Rival 600 Gaming Mouse",
      price: "₦30,000",
      image: prod5,
      category: "Gaming Mouse",
      brand: "SteelSeries",
      stock: 9,
      com: comIC6,
      shortDescription:
        "A dual-sensor gaming mouse with adjustable weight tuning for precision control.",
      longDescription:
        "The SteelSeries Rival 600 introduces a dual-sensor system that eliminates lift-off tracking issues entirely. Combined with adjustable weights, durable silicone grips, and ultra-fast mechanical switches, it’s perfect for gamers who demand accuracy.",
      features: [
        "TrueMove3+ dual-sensor system",
        "Adjustable weight tuning",
        "Split-trigger mechanical switches",
        "RGB illumination zones",
        "Premium silicone side grips",
      ],
    },
    {
      id: 7,
      name: "Logitech G Pro Mechanical Gaming Keyboard",
      price: "₦28,000",
      image: prod6,
      category: "Gaming Keyboard",
      brand: "Logitech",
      stock: 7,
      com: comIC7,
      shortDescription:
        "A compact mechanical keyboard made for esports players and fast-reaction gameplay.",
      longDescription:
        "The Logitech G Pro Mechanical Keyboard offers a tournament-ready design with compact portability, detachable cable, and ultra-responsive GX Blue or Red switches. Perfect for competitive players who need speed and precision.",
      features: [
        "GX mechanical switches",
        "Compact TKL design",
        "Detachable braided cable",
        "Customizable RGB lighting",
        "Durable steel-reinforced base",
      ],
    },
    {
      id: 8,
      name: "Razer Kraken X Lite Gaming Headset",
      price: "₦12,000",
      image: prod,
      category: "Gaming Headset",
      brand: "Razer",
      stock: 14,
      com: comIC1,
      shortDescription:
        "An ultra-lightweight gaming headset with crisp audio and a flexible microphone.",
      longDescription:
        "The Razer Kraken X Lite is built for comfort with a super-light frame and soft ear cushions. Its custom-tuned drivers deliver balanced sound for gaming and media, while the bendable cardioid mic ensures clear voice chat.",
      features: [
        "Ultra-light 230g build",
        "Custom-tuned 40mm drivers",
        "Bendable cardioid microphone",
        "Comfortable plush ear cushions",
        "Cross-platform compatibility",
      ],
    },
  ];

  const [products, setProducts] = useState(initial);

  const addProduct = (p) => {
    setProducts((prev) => {
      const prevId = prev.length ? Number(prev[prev.length - 1].id) || 0 : 0;
      const newId = prevId + 1;
      const newFeatures = p.features
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f !== "");

      const newProduct = { id: newId, ...p, features: newFeatures };
      return [newProduct, ...prev];
    });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
