import Tournament from "../../database/models/tournament.js";

export default async function (community) {
  const tournaments = await Tournament.find({ hostedBy: community })
    .populate("game", "name")
    .populate("hostedBy", "name image")
    .populate("participants.user", "fullname image");
  return tournaments;
}
