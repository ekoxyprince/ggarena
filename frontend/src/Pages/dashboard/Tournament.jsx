import React, { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import Layout from "../../Components/ui/Layout";
import CustomButton from "../../Components/CustomButton";
import useFetch from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import useMutate from "../../hooks/useMutate";
import TournamentMenus from "../../Components/ui/TournamentMenus";

function Tournament() {
  const [hidetop, setHideTop] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const navigate = useNavigate();
  const clickedRef = React.useRef(null);
  const { id } = useParams("id");
  const { data, refetch, isPending } = useFetch({
    url: `/api/tournaments/${id}`,
    key: `tournament@${id}`,
  });

  const fileClicked = () => {
    clickedRef.current.click();
  };

  const [images, setImage] = React.useState([]);
  const handleImageChange = async (e) => {};

  const { mutateAsync: addOrRemoveParticipant } = useMutate(
    `api/tournaments/${id}/participant`,
    [`update@${id}-participant`],
    "patch"
  );

  async function joinOrLeaveCommunity() {
    setIsPressed(true);
    await addOrRemoveParticipant(
      {},
      {
        onSettled: (resp) => {
          setIsPressed(false);
          if (resp) {
            refetch();
          }
        },
      }
    );
  }

  function navigateToCommunity(id) {
    navigate(`/community/${id}`);
  }

  React.useEffect(() => {}, [id]);

  if (isPending) {
    return <div></div>;
  }

  return (
    <div>
      {/* Small top header */}
      <Layout
        className={`${hidetop ? "pt-[20px] block max-w-[100%]" : "hidden"}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 gap-4 md:gap-0">
          <div className="flex items-center gap-4 w-full">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img
                src={data?.cover}
                className="w-full h-full object-cover object-center"
                alt=""
              />
            </div>
            <div>
              <h2 className="text-white text-[28px] md:text-[48px] font-bold font-Poppins z-[10000]">
                {data?.name}
              </h2>
            </div>
          </div>

          <div className="w-full md:w-auto text-center md:text-right">
            {!data?.inCommunity ? (
              <CustomButton
                className="bg-primary text-sm md:text-md lg:text-[14px] font-semibold z-10 relative text-secondary w-full md:w-40 h-[42px] mt-4 md:mt-0 rounded-md disabled:opacity-30"
                text={"Join Community"}
                isDisabled={isPressed}
                onPress={navigateToCommunity.bind(this, data?.hostedBy._id)}
              />
            ) : !data?.hasJoined && data?.status == "scheduled" ? (
              <CustomButton
                className="bg-primary text-sm md:text-md lg:text-[14px] font-semibold z-10 relative text-secondary w-full md:w-40 h-[42px] mt-4 md:mt-0 rounded-md disabled:opacity-30"
                text={"Join Tournament"}
                isDisabled={isPressed}
                onPress={joinOrLeaveCommunity}
              />
            ) : !data?.hasJoined && data?.status == "scheduled" ? (
              <CustomButton
                className="bg-primary text-sm md:text-md lg:text-[14px] font-semibold z-10 relative text-secondary w-full md:w-40 h-[42px] mt-4 md:mt-0 rounded-md disabled:opacity-30"
                text={"Leave Tournament"}
                isDisabled={isPressed}
                onPress={joinOrLeaveCommunity}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </Layout>

      {/* Banner */}
      <div className={`${hidetop ? "hidden" : "block"}`}>
        <div>
          <div
            className="bg-cover bg-no-repeat bg-center h-[200px] md:h-[330px] relative overflow-hidden img-bg"
            style={{
              backgroundImage: `linear-gradient(rgba(31,31,31,0) 0%, rgba(31,31,31,0.2) 55%, rgba(31,31,31,1) 100%), url(${data?.image})`,
            }}
          ></div>
        </div>

        <Layout className={"-mt-[45px] max-w-[94%]"}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-[30px] items-center text-white text-center md:text-left w-full">
              <div>
                <h2 className="text-white text-[28px] md:text-[48px] font-bold font-Poppins z-[10] mt-10 md:mt-8">
                  {data?.name}
                </h2>
              </div>
            </div>

            <div className="w-full md:w-auto text-center md:text-right">
              {!data?.inCommunity ? (
                <CustomButton
                  className="bg-primary text-sm md:text-md lg:text-[14px] font-semibold z-10 relative text-secondary w-full md:w-40 h-[42px] mt-4 md:mt-0 rounded-md disabled:opacity-30"
                  text={"Join Community"}
                  isDisabled={isPressed}
                  onPress={navigateToCommunity.bind(this, data?.hostedBy._id)}
                />
              ) : !data?.hasJoined && data?.status == "scheduled" ? (
                <CustomButton
                  className="bg-primary text-sm md:text-md lg:text-[14px] font-semibold z-10 relative text-secondary w-full md:w-40 h-[42px] mt-4 md:mt-0 rounded-md disabled:opacity-30"
                  text={"Join Tournament"}
                  isDisabled={isPressed}
                  onPress={joinOrLeaveCommunity}
                />
              ) : !data?.hasJoined && data?.status == "scheduled" ? (
                <CustomButton
                  className="bg-primary text-sm md:text-md lg:text-[14px] font-semibold z-10 relative text-secondary w-full md:w-40 h-[42px] mt-4 md:mt-0 rounded-md disabled:opacity-30"
                  text={"Leave Tournament"}
                  isDisabled={isPressed}
                  onPress={joinOrLeaveCommunity}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </Layout>
      </div>

      {/* Tabs */}
      <Layout className={"max-w-[94%]"}>
        <div className="mt-[40px] px-[16px] md:px-[24px] lg:px-[31px]">
          <TournamentMenus />
        </div>
      </Layout>
    </div>
  );
}

export default Tournament;
