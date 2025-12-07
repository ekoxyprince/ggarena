import React from "react";
import { Images } from "../assets/Images";
import Section from "../Components/Section";
import { Link, useNavigate } from "react-router-dom";
import IconBtn from "../Components/IconBtn";
import { FaGoogle, FaFacebookSquare } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useMutate from "../hooks/useMutate";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { register, handleSubmit } = useForm({});
  const { mutateAsync } = useMutate("/api/auth/signin", ["signin"], "post");
  const [isVisible, setIsVisible] = React.useState(false);

  async function onSubmit(data) {
    if (Object.values(data).includes("")) {
      toast.error("All fields are required!");
    } else {
      await mutateAsync(data, {
        onSettled: (resp) => {
          if (resp) {
            auth.login(resp.accessToken);
            navigate(resp.role == "user" ? "/account" : "/admin/dashboard");
          }
        },
      });
    }
  }

  return (
    <div>
      {/* Header background section */}
      <div className="header-bg w-full h-[300px] sm:h-[400px] bg-red-300 overflow-hidden relative">
        <div className="overlay w-full h-full bg-black/45 absolute left-0 top-0 z-[5]" />
        <div className="sli">
          <img
            src={Images.gamesBg}
            alt=""
            className="w-full h-full object-cover"
          />
          <img
            src={Images.gamesBg}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <Section className="bg-[#1f1f1f] md:px-4 sm:px-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            my-[40px] sm:my-[60px] 
            px-[15px] sm:px-[20px] 
            py-[30px] sm:py-[40px] 
            border-[2px] sm:border-[2.5px] 
            border-[#303030] bg-[#1f1f1f] 
            relative z-20 
            mt-[-150px] sm:mt-[-200px] 
            w-full max-w-[550px] mx-auto
            rounded-md sm:rounded-none
          "
        >
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-3 justify-center">
            <img
              src={Images.yellowBorder}
              className="w-[50px] sm:w-[65px]"
              alt=""
            />
            <p className="text-center uppercase font-syne text-[17px] sm:text-[19px] text-primary font-medium">
              Log In
            </p>
            <img
              src={Images.yellowBorder}
              className="w-[50px] sm:w-[65px] rotate-180"
              alt=""
            />
          </div>

          <h1 className="font-Mont text-white uppercase text-[28px] sm:text-[35px] text-center font-bold">
            Enter The Arena
          </h1>
          <p className="font-Mont text-[13px] sm:text-[14px] text-center mt-[15px] sm:mt-[19px] text-white/80 mb-[25px] sm:mb-[30px]">
            Log in to access powerful tools for creating and managing
            tournaments, registering teams, scheduling matches, and tracking
            gameplay live.
          </p>

          {/* Form Inputs */}
          <div className="flex flex-col gap-[12px] sm:gap-[15px]">
            <input
              type="text"
              placeholder="Email"
              className="w-full bg-[#292929] border-t-[2px] border-b-[2px] border-[#474747] h-[42px] sm:h-[45px] outline-0 px-[15px] sm:px-[20px] font-syne text-[14px] sm:text-[15px]"
              {...register("email", { required: true })}
            />
            <div className="relative">
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-[#292929] border-t-[2px] border-b-[2px] border-[#474747] h-[42px] sm:h-[45px] outline-0 px-[15px] sm:px-[20px] font-syne text-[14px] sm:text-[15px]"
                {...register("password", { required: true })}
              />
              <div
                onClick={() => setIsVisible((prev) => !prev)}
                className="absolute top-[50%] translate-y-[-50%] right-2"
              >
                {isVisible ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="border border-[#474747] accent-primary w-[15px] h-[15px]"
                />
                <span className="text-[14px] sm:text-[15.5px] text-white/80">
                  Remember me
                </span>
              </div>
              <Link
                to={"/forget-password"}
                className="text-[14px] sm:text-[15.5px] text-white/80 hover:text-primary transition"
              >
                Forgotten Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-[12px] sm:py-[13px] px-[15px] sm:px-[20px] bg-primary text-secondary text-[14.5px] sm:text-[15px] font-bold font-Mont mt-[25px] sm:mt-[30px] relative"
          >
            <img
              src={Images.blackBorder2}
              className="w-[30px] sm:w-[40px] rotate-90 absolute left-[-2px] top-[50%] translate-y-[-50%]"
              alt=""
            />
            LOGIN
            <img
              src={Images.blackBorder2}
              className="w-[30px] sm:w-[40px] -rotate-90 absolute right-[-2px] top-[50%] translate-y-[-50%]"
              alt=""
            />
          </button>

          {/* Or Divider */}
          <p className="my-[15px] sm:my-[20px] text-center text-[14px] sm:text-[15px] text-white/80">
            Or
          </p>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[20px] items-center sm:items-start">
            <IconBtn text="Continue with Google" className="w-full sm:w-auto">
              <FaGoogle />
            </IconBtn>
            <IconBtn text="Continue with Facebook" className="w-full sm:w-auto">
              <FaFacebookSquare />
            </IconBtn>
          </div>

          {/* Signup Link */}
          <p className="font-syne text-[15px] sm:text-[16px] text-center mt-[18px] sm:mt-[20px] text-white/80">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="uppercase font-syne text-primary text-[14px] sm:text-[15px] hover:underline"
            >
              create an account
            </Link>
          </p>
        </form>
      </Section>
    </div>
  );
}

export default Login;
