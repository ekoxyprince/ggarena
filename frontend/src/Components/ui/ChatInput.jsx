import { useState } from "react";
import { Paperclip, Send } from "lucide-react";

export default function ChatInput({ onSend, communityId }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.length > 0) {
      console.log("Send:", message);
      onSend(communityId, message.trim());
      setMessage("");
    }
  };

  return (
    <div>
      <div className="fixed bottom-0 left-[52%] w-[88%] translate-x-[-50%] bg-[#1f1f1f] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4">
        <div className="flex items-center gap-2 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full bg-[#2A2A2A] text-white rounded-full px-5 py-2 h-[50px] focus:outline-none border-1 border-primary/40"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            className="p-2 bg-primary text-secondary rounded-full hover:bg-secondary absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
