import React from "react";
import ProductCard from "../../Components/ui/ProductCard";
import prod from "../../assets/Images/prod.png";
import prod1 from "../../assets/Images/prod1.png";
import prod2 from "../../assets/Images/prod2.png";
import prod3 from "../../assets/Images/prod3.png";
import prod4 from "../../assets/Images/prod4.png";
import prod5 from "../../assets/Images/prod5.png";
import prod6 from "../../assets/Images/prod6.png";
import comIC1 from "../../assets/Images/comIC.webp";
import comIC2 from "../../assets/Images/comIC2.webp";
import comIC3 from "../../assets/Images/comIC3.webp";
import comIC4 from "../../assets/Images/comIC4.webp";
import comIC5 from "../../assets/Images/comIC5.webp";
import comIC6 from "../../assets/Images/comIC6.webp";
import comIC7 from "../../assets/Images/comIC7.webp";
import CreateProduct from "../../Components/ui/CreateProduct";
function Marketplace() {
  const products = [
    {
      name: "ONIKUMA GT808 2.4GHz Wireless Gaming Headset",
      price: "₦20,000",
      image: prod,
      category: "Gaming",
      com: comIC1,
    },
    {
      name: "Logitech G Pro X Gaming Headset",
      price: "₦25,000",
      image: prod1,
      category: "Gaming",
      com: comIC2,
    },
    {
      name: "Razer DeathAdder V2 Gaming Mouse",
      price: "₦15,000",
      image: prod2,
      category: "Gaming",
      com: comIC3,
    },
    {
      name: "Corsair K55 RGB Gaming Keyboard",
      price: "₦18,000",
      image: prod3,
      category: "Gaming",
      com: comIC4,
    },
    {
      name: "HyperX Cloud II Gaming Headset",
      price: "₦22,000",
      image: prod4,
      category: "Gaming",
      com: comIC5,
    },
    {
      name: "SteelSeries Rival 600 Gaming Mouse",
      price: "₦30,000",
      image: prod5,
      category: "Gaming",
      com: comIC6,
    },
    {
      name: "Logitech G Pro Mechanical Gaming Keyboard",
      price: "₦28,000",
      image: prod6,
      category: "Gaming",
      com: comIC7,
    },
    {
      name: "Razer Kraken X Lite Gaming Headset",
      price: "₦12,000",
      image: prod,
      category: "Gaming",
      com: comIC1,
    },
  ];
  return (
    <div>
      <CreateProduct />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] gap-y-[30px] pt-[40px]">
      {products.map((product, index) => (
        <ProductCard key={index} data={product} />
      ))}
    </div>
    </div>
  );
}

export default Marketplace;
