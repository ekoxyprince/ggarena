import { io } from "socket.io-client";

const socket = io("https://72.62.52.249", {
  autoConnect: false,
  auth: {
    token: null,
  },
  transports: ["websocket"],
});

export default socket;
