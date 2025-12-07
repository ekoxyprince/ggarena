import { io } from "socket.io-client";

const socket = io("http://72.62.52.249:3000", {
  autoConnect: false,
  auth: {
    token: null,
  },
  transports: ["websocket"],
});

export default socket;
