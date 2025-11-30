import { io } from "socket.io-client";

const socket = io("http://194.163.168.60:3000", {
  autoConnect: false,
  auth: {
    token: null,
  },
  transports: ["websocket"],
});

export default socket;
