import React from "react";
import { IoAddOutline } from "react-icons/io5";

function CreateProduct() {
  return (
    <div className="p-[15px] cursor-pointer hover:bg-[#262626] h-fit rounded-lg border-[#ffd700]/45 border-[1px] mt-[30px] border-dashed flex items-center gap-[15px]">
      <div className="w-[55px] bg-[#2e2e2e] h-[55px] rounded-full flex items-center justify-center cursor-pointer overflow-hidden">
        <IoAddOutline className="text-primary" size={20} />
      </div>
      <div>
        <h3 className="font-semibold">Add Product</h3>
        <p className="text-[#8a8a8a] text-[14px]">
          List your product on the marketplace.
        </p>
      </div>
    </div>
  );
}

export default CreateProduct;
