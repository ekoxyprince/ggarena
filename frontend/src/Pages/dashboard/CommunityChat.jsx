import React from "react";
import { Images } from "../../assets/Images";
import { Divider } from "antd";
import comIC1 from "../../assets/Images/comIC.webp";
import comIC2 from "../../assets/Images/comIC2.webp";
import comIC3 from "../../assets/Images/comIC3.webp";
import comIC4 from "../../assets/Images/comIC4.webp";
import comIC5 from "../../assets/Images/comIC5.webp";
import comIC6 from "../../assets/Images/comIC6.webp";
import comIC8 from "../../assets/Images/comIC8.webp";
import ChatInput from "../../Components/ui/ChatInput";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import socket from "../../utils/socket";
import { DateTime } from "luxon";

function CommunityChat() {
  const { id } = useParams("id");
  const { data, isPending, refetch } = useFetch({
    url: `/api/communities/${id}`,
    key: `community@${id}`,
  });
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    if (!isPending && data) {
      setMessages(data?.messages);
    }
  }, []);
  React.useEffect(() => {
    function updateMessage(data) {
      setMessages((prev) => [...prev, data]);
    }
    socket.on("new-message", updateMessage);
    return () => {
      socket.off("new-message", updateMessage);
    };
  }, []);
  function sendMessage(communityId, message) {
    socket.emit("message", { community: communityId, message });
  }
  if (isPending) {
    return <div></div>;
  }
  if (!data?.hasJoined) {
    return (
      <div className="w-full mx-auto">
        <div className="top mt-[20px]">
          <h2 className="font-bold mt-[5px] text-[20px] md:text-[30px] text-center">
            You are not a member!
          </h2>
          <p className="text-[10px] md:text-[15px] text-gray-400 text-center">
            Only member belonging to this community can send or view messages.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full overflow-hidden">
      <div className="top mt-[20px]">
        <h2 className="font-bold mt-[5px] text-[25px] md:text-[30px]">
          Welcome to {data?.name}!
        </h2>
        <p className="text-[12px] md:text-[15px] text-gray-400">
          This is the community chat room. You can chat with other members here.
        </p>
      </div>
      <div className="mt-[30px] pb-[50px] relative w-full">
        {/* <Divider orientation="center" className="flex items-center">
          <span className="font-syne text-sm text-gray-400">
            August 28, 2025
          </span>
        </Divider> */}
        <div className="chats -mt-5">
          {messages?.map((chat, index) => (
            <div key={index} className="message border-white/10 py-[10px]">
              <div className="flex items-start gap-3">
                <img
                  src={chat.sender.profilePic}
                  alt="Avatar"
                  className="w-[40px] mt-[2px] h-[40px] rounded-full"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {chat.sender.fullname}
                    </span>
                    <span className="text-gray-500 text-[12px] mt-[0.5px]">
                      {DateTime.fromISO(chat.createdAt).toRelative()}
                    </span>
                  </div>
                  <span className="text-white/80 text-[15px] !font-light">
                    {chat.message}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatInput onSend={sendMessage} communityId={id} />
    </div>
  );
}

export default CommunityChat;
