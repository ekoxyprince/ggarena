import app from "./app.js";
import { createServer } from "node:http";
import env from "./config/env.js";
import connectToDb from "./database/index.js";
import { Server } from "socket.io";
import { onConnect } from "./services/sockets/index.js";
import User from "./database/models/user.js";

const server = createServer(app);
export const io = new Server(server);
connectToDb().then(async () => {
  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    await User.create({
      fullname: "Administrator",
      email: "support@ggarena.gg",
      password: "GGarena@dev",
      role: "admin",
    });
    console.log("Admin Created");
  }
  server.listen(env.port);
  server.on("listening", () => {
    console.log(`Server is running on port ${env.port}`);
  });
  io.on("connection", function (socket) {
    onConnect(socket);
    console.log("Connected to socket " + socket.id);
  });
});
