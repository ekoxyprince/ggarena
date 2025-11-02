import Community from "../../database/models/community.js";
import Message from "../../database/models/message.js";
import { io } from "../../server.js";
import jwt from "jsonwebtoken";
import User from "../../database/models/user.js";
import env from "../../config/env.js";

export const onConnect = async (socket) => {
  const token = socket.handshake.auth.token;
  const decoded = jwt.verify(token, env.jwt_secret);
  const user = await User.findById(decoded.id);
  if (!user) throw new Error("Internal server error");
  socket.on("join-room", (data) => {
    socket.join(data.room);
  });
  socket.on("message", async (data) => {
    const newMessage = await Message.create({ ...data, sender: user._id });
    io.to(data.community).emit("new-message", {
      ...data,
      sender: {
        fullname: user.fullname,
        profilePic: user.profilePic,
      },
      createdAt: newMessage.createdAt,
    });
  });
};
