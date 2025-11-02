import { useGlobalContext } from "../../contexts/GlobalContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Images } from "../../assets/Images";
import { useForm } from "react-hook-form";
import useMutate from "../../hooks/useMutate";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function TournamentModal() {
  const { isTournamentModalOpen, controlTournamentModal } = useGlobalContext();
  const { id } = useParams("id");
  const [isPressed, setIsPressed] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const { mutateAsync } = useMutate(
    `/api/communities/${id}/tournament`,
    ["create-tournament"],
    "post",
    { "Content-Type": "multipart-formdata" }
  );
  const { data: games } = useFetch({ url: "/api/games", key: "games" });
  const onSubmit = async (data) => {
    setIsPressed(true);
    const formData = new FormData();
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] == "image") {
        formData.append(keys[i], data[keys[i]][0]);
      } else {
        formData.append(keys[i], data[keys[i]]);
      }
    }
    await mutateAsync(formData, {
      onSettled: () => {
        setIsPressed(false);
        controlTournamentModal();
      },
    });
  };
  return (
    <div
      className={`w-full ${
        isTournamentModalOpen ? "scale-100" : "scale-0"
      } h-[100vh] flex items-center justify-center z-50 fixed bg-[rgba(0,0,0,0.45)] ease-linear duration-100 backdrop-blur-md top-0 left-0 right-0 bottom-0`}
    >
      <div
        className={` h-[100vh] w-full fixed z-40 ease-linear duration-300`}
        onClick={controlTournamentModal}
      ></div>
      <div className=" flex flex-col space-y-4 ">
        <form
          action=""
          className="my-[60px] px-[20px] py-[40px] border-[2.5px] bg-transparent backdrop-blur-md  rounded-lg relative z-50  border-[#303030] max-w-[380px] md:max-w-[550px] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-4 mb-3 justify-center">
            <img src={Images.yellowBorder} className="w-[65px]" alt="" />
            <p className="text-center uppercase font-syne text-[19px] text-primary font-medium">
              Create Tournament
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
              placeholder="Tournament Name"
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
              {...register("name", { required: true })}
            />
            <select
              {...register("game", { required: true })}
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
            >
              {games?.map((g) => {
                return (
                  <option key={g._id} value={g._id}>
                    {g.name}
                  </option>
                );
              })}
            </select>
            <select
              {...register("mode", { required: true })}
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
            >
              <option value="1v1" key="">
                1v1
              </option>
            </select>
            <select
              {...register("totalParticipants", { required: true })}
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
            >
              <option value="8" key="">
                8
              </option>
              <option value="16" key="">
                16
              </option>
              <option value="32" key="">
                32
              </option>
            </select>
            <input
              type="text"
              placeholder="Victory Prize"
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
              {...register("price", { required: true })}
            />
            <select
              {...register("currency", { required: true })}
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
            >
              <option value="NGN" key="">
                NGN
              </option>
              <option value="USD" key="">
                USD
              </option>
            </select>
            <div className="relative">
              <input
                type="file"
                className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[45px] outline-0 px-[20px] font-syne"
                {...register("image", { required: true })}
              />
              <p className="absolute top-[25%] translate-y-[-55%] right-2 font-Mont text-[14px] text-center mt-[19px] text-white/80 mb-[30px]">
                Tournament Icon
              </p>
            </div>
            <textarea
              cols="50"
              rows="100"
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[100px] outline-0 px-[20px] font-syne"
              defaultValue={"Overview"}
              {...register("overview", { required: true })}
            ></textarea>
            <textarea
              cols="50"
              rows="100"
              className="w-full bg-none border-[2px] rounded-md border-b-[2px] border-primary border-dotted h-[100px] outline-0 px-[20px] font-syne"
              defaultValue={"Rules and Regulations"}
              {...register("rules", { required: true })}
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
            Create Tournament
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
