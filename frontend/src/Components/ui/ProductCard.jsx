import React from "react";
import { Images } from "../../assets/Images";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton";
function ProductCard({ data }) {
  const { name, price, image, category, com } = data;

  return (
    <div className="">
      <div className="img-holder w-full h-[150px] border border-primary/40 overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover object-center"
          src={image}
          alt=""
        />
      </div>
      <div className="bottom w-full mt-[10px] flex gap-2 items-start">
        <div className="seller w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={com}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1">
          {/* <div className="tag w-fit p-[2px] px-[13px] border-primary/70 border-1 text-[13px] rounded-lg text-primary/70">
            {category}
          </div> */}
          <Link className="name font-semibold hover:underline line-clamp-2 text-[16px] text-white/95">
            {name}
          </Link>
          <p className="price mt-[-2px] text-primary text-[15px]">{price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
