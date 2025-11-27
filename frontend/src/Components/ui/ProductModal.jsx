import { useGlobalContext } from "../../contexts/GlobalContext";
import React from "react";
import CustomButton from "../CustomButton";
import { RiUserShared2Fill, RiUserAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Images } from "../../assets/Images";
import { useForm } from "react-hook-form";
import useMutate from "../../hooks/useMutate";
import { useParams } from "react-router-dom";

function ProductModal() {
  const { isProductModalOpen, controlProductModal } = useGlobalContext();
  const [isPressed, setIsPressed] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const { mutateAsync } = useMutate(
    `/api/products/community/${id}`,
    ["create-products"],
    "post",
    { "Content-Type": "multipart-formdata" }
  );
  const onSubmit = async (data) => {
    setIsPressed(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("currency", data.currency);
    formData.append("features", data.features);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("stockCount", data.stockCount);
    formData.append("image", data.image[0]);
    await mutateAsync(formData, {
      onSettled: () => {
        setIsPressed(false);
        controlProductModal();
      },
    });
  };
  return (
    <div
      className={`w-full ${
        isProductModalOpen ? "scale-100" : "scale-0"
      } h-[100vh] flex items-center justify-center z-50 fixed bg-[rgba(0,0,0,0.45)] ease-linear duration-100 backdrop-blur-md top-0 left-0 right-0 bottom-0`}
    >
      <div
        className={` h-[100vh] w-full fixed z-40 ease-linear duration-300`}
        onClick={controlProductModal}
      ></div>
      <div className=" flex flex-col space-y-4 ">
        <form
          action=""
          className="my-[60px] px-[20px] py-[40px] border-[2.5px] bg-transparent backdrop-blur-md  rounded-lg relative z-50 mt-[50px] border-[#303030] max-w-[380px] md:max-w-[550px] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-4 mb-3 justify-center">
            <img src={Images.yellowBorder} className="w-[65px]" alt="" />
            <p className="text-center uppercase font-syne text-[19px] text-primary font-medium">
              Create Product
            </p>
            <img
              src={Images.yellowBorder}
              className="w-[65px] rotate-180"
              alt=""
            />
          </div>

          <div className="flex flex-col gap-[15px]">
            <input
              type="text"
              placeholder="Product Name"
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
              {...register("name", { required: true })}
            />
            <input
              type="text"
              placeholder="Price"
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
              {...register("price", { required: true })}
            />
            <select
              {...register("currency", { required: true })}
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
            >
              <option value={"NGN"} selected>
                NGN
              </option>
            </select>
            <input
              type="text"
              placeholder="Brand"
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
              {...register("brand", { required: true })}
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
              {...register("category", { required: true })}
            />
            <input
              type="text"
              placeholder="Features (Seperate each feature with a comma ,)"
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
              {...register("features", { required: true })}
            />
            <input
              type="text"
              placeholder="Amount in stock"
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
              {...register("stockCount", { required: true })}
            />
            <div className="relative">
              <input
                type="file"
                className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
                {...register("image", { required: true })}
              />
              <p className="absolute top-[25%] translate-y-[-55%] right-2 font-Mont text-[14px] text-center mt-[19px] text-white/80 mb-[30px]">
                Product Image
              </p>
            </div>
            <textarea
              cols="50"
              rows="100"
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[100px] outline-0 px-[20px] font-syne"
              defaultValue={"Description"}
              {...register("description", { required: true })}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-[13px] px-[20px] bg-primary text-secondary text-[15px] font-bold font-Mont mt-[30px] relative disabled:opacity-30"
            disabled={isPressed}
          >
            <img
              src={Images.blackBorder2}
              className="w-[40px] rotate-90 absolute left-[-2px] top-[50%] translate-y-[-50%]"
              alt=""
            />
            Create Product
            <img
              src={Images.blackBorder2}
              className="w-[40px] -rotate-90 absolute right-[-2px] top-[50%] translate-y-[-50%]"
              alt=""
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
