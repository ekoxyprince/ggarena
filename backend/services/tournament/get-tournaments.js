import Tournament from "../../database/models/tournament.js";

export default async function (q) {
  const query = q && {
    name: { $regex: new RegExp(q) },
  };
  const tournaments = await Tournament.find(query || {})
    .populate("game", "name")
    .populate("hostedBy", "name image")
    .populate("participants.user", "fullname image");
  return tournaments;
}
