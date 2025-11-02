import Tournament from "../../database/models/tournament.js";

export default async function (id, userId) {
  const tournament = await Tournament.findById(id)
    .populate("game", "name")
    .populate("hostedBy", "name image participants createdBy")
    .populate("participants.user", "fullname profilePic");
  const tournamentObject = tournament.toObject();
  tournamentObject.hasJoined = tournament.participants.some(
    (p) => p.user._id.toString() == userId.toString()
  );
  tournamentObject.inCommunity = tournament.hostedBy.participants.some(
    (p) => p.user.toString() == userId.toString()
  );
  tournamentObject.isAdmin =
    tournament.hostedBy.createdBy.toString() == userId.toString();
  return tournamentObject;
}
