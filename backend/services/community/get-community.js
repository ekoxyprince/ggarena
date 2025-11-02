import Community from "../../database/models/community.js";
import Message from "../../database/models/message.js";
import Tournament from "../../database/models/tournament.js";

export default async function (id, userId) {
  const community = (
    await Community.findById(id)
      .populate("participants.user", "fullname profilePic")
      .populate("createdBy", "fullname profilePic")
  ).toObject();
  community.hasJoined = community.participants.some(
    (p) => p.user._id.toString() == userId.toString()
  );
  community.isAdmin = community.createdBy._id.toString() == userId.toString();
  const messages = await Message.find({ community: id }).populate(
    "sender",
    "fullname profilePic"
  );
  community.messages = messages;
  community.upcomingTournaments = await Tournament.find({
    hostedBy: id,
    status: "scheduled",
  })
    .populate("game", "name")
    .populate("hostedBy", "name image");
  community.pastTournaments = await Tournament.find({
    hostedBy: id,
    status: "ended",
  })
    .populate("game", "name")
    .populate("hostedBy", "name image");
  return community;
}
