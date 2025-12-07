import { io } from "socket.io-client";

const socket = io("https://ggarena.gg", {
  autoConnect: false,
  auth: { token: null },
  transports: ["websocket", "polling"],
});

export default socket;
