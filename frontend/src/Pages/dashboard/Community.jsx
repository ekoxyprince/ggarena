import React, { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import CommunityImgUpload from "../../Components/ui/CommunityImgUpload";
import Layout from "../../Components/ui/Layout";
import { Avatar, AvatarGroup } from "@heroui/react";
import CustomButton from "../../Components/CustomButton";
import { useParams } from "react-router-dom";
import CommunityMenus from "../../Components/ui/CommunityMenus";
import useFetch from "../../hooks/useFetch";
import formatNumber from "../../utils/formatNumber";
import useMutate from "../../hooks/useMutate";
import socket from "../../utils/socket";

function Community() {
  const [hidetop, setHideTop] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const clickedRef = React.useRef(null);
  const { id } = useParams("id");

  const { data, refetch, isPending } = useFetch({
    url: `/api/communities/${id}`,
    key: `community@${id}`,
  });

  const { mutateAsync } = useMutate(
    `/api/communities/${id}`,
    [`update@${id}`],
    "patch",
    { "Content-Type": "multipart-formdata" }
  );

  const { mutateAsync: addOrRemoveParticipant } = useMutate(
    `api/communities/${id}/participant`,
    [`update@${id}-participant`],
    "patch"
  );

  const [images, setImage] = React.useState([]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "cover");

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);

      await mutateAsync(formData, {
        onSettled: () => {
          refetch();
        },
      });
    }
  };

  const fileClicked = () => {
    clickedRef.current.click();
  };

  async function joinOrLeaveCommunity() {
    setIsPressed(true);
    await addOrRemoveParticipant(
      {},
      {
        onSettled: (resp) => {
          if (resp) {
            refetch();
            setIsPressed(false);
          }
        },
      }
    );
  }

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.emit("join-room", { room: id });
  }, [id]);

  if (isPending) {
    return <div></div>;
  }

  return (
    <div>
      {/* Compact top layout for mobile when hidetop is true */}
      <Layout className={`${hidetop ? "pt-5 block max-w-full" : "hidden"}`}>
        <div className="flex justify-between items-center flex-col md:flex-row w-full gap-4 px-4">
          <div className="flex items-center gap-4 w-full">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img
                src={data?.cover}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-bold">{data?.name}</h2>
              <AvatarGroup
                className="scale-90"
                size="sm"
                isBordered
                max={3}
                renderCount={() => (
                  <p className="text-sm font-medium text-primary ml-2">
                    {formatNumber(data?.participants.length)} Members
                  </p>
                )}
                total={data?.participants.length}
              >
                {data?.participants.map((d) => (
                  <Avatar src={d.user.image} key={d.user._id} />
                ))}
              </AvatarGroup>
            </div>
          </div>

          <div className="w-full md:w-auto text-center md:text-right">
            <CustomButton
              className="bg-primary text-sm md:text-md !font-semibold text-secondary w-full md:w-40 h-[42px] rounded-md disabled:opacity-30"
              text={data?.hasJoined ? "Leave Community" : "Join Community"}
              isDisabled={isPressed}
              onPress={joinOrLeaveCommunity}
            />
          </div>
        </div>
      </Layout>

      {/* Banner and main layout when hidetop is false */}
      <div className={`${hidetop ? "hidden" : "block"}`}>
        {/* Banner Section */}
        <div
          className="bg-cover bg-no-repeat bg-center min-h-[200px] md:h-[330px] relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(31,31,31,0) 0%, rgba(31,31,31,0.2) 55%, rgba(31,31,31,1) 100%), url(${
              images.length > 0 ? images : data?.cover
            })`,
          }}
        >
          {data?.isAdmin && data?.hasJoined && (
            <button
              onClick={fileClicked}
              className="flex items-center gap-2 z-10 absolute bg-[#2e2e2e] px-4 h-9 rounded-lg right-4 top-4 text-sm md:text-base"
            >
              <FaCamera /> Upload Banner
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            ref={clickedRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Avatar & Info Section */}
        <Layout className="-mt-[45px] max-w-[94%]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 px-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-[30px] items-center text-white text-center md:text-left w-full">
              <CommunityImgUpload
                img={data?.image}
                isAdmin={data?.isAdmin}
                isJoined={data?.hasJoined}
              />
              <div>
                <h2 className="text-[24px] md:text-[36px] font-bold font-Poppins">
                  {data?.name}
                </h2>
                <AvatarGroup
                  size="sm"
                  isBordered
                  max={3}
                  renderCount={() => (
                    <p className="text-sm font-medium text-primary ml-2">
                      {formatNumber(data?.participants.length)} Members
                    </p>
                  )}
                  total={data?.participants.length}
                >
                  {data?.participants.map((d) => (
                    <Avatar src={d.user.image} key={d.user._id} />
                  ))}
                </AvatarGroup>
              </div>
            </div>

            <div className="w-full md:w-auto text-center md:text-right">
              <CustomButton
                className="bg-primary text-sm md:text-md !font-semibold text-secondary w-full md:w-40 h-[42px] mt-4 md:mt-0 rounded-md disabled:opacity-30"
                text={data?.hasJoined ? "Leave Community" : "Join Community"}
                isDisabled={isPressed}
                onPress={joinOrLeaveCommunity}
              />
            </div>
          </div>
        </Layout>
      </div>

      {/* Menu Section */}
      <Layout className="max-w-[94%]">
        <div className="mt-10 px-4 lg:px-8">
          <CommunityMenus hidetop={hidetop} setHideTop={setHideTop} />
        </div>
      </Layout>
    </div>
  );
}

export default Community;
