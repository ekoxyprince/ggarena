import app from "./app.js";
import { createServer } from "node:http";
import env from "./config/env.js";
import connectToDb from "./database/index.js";
import { Server } from "socket.io";
import { onConnect } from "./services/sockets/index.js";

const server = createServer(app);
export const io = new Server(server);
connectToDb().then(() => {
  server.listen(env.port);
  server.on("listening", () => {
    console.log(`Server is running on port ${env.port}`);
  });
  io.on("connection", function (socket) {
    onConnect(socket);
    console.log("Connected to socket " + socket.id);
  });
});
