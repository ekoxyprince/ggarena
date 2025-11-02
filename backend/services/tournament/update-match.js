import Tournament from "../../database/models/tournament.js";
import Match from "../../database/models/match.js";
import {
  AuthorizationError,
  BadrequestError,
} from "../../http/exceptions/error.js";

export default async function (tournamentId, matchId, userId, update) {
  try {
    const tournament = await Tournament.findById(tournamentId)
      .populate("game", "name")
      .populate("hostedBy", "name image participants createdBy")
      .populate("participants.user", "fullname profilePic");
    if (!tournament) {
      throw new BadrequestError("No tournament found");
    }
    const isAdmin =
      tournament.hostedBy.createdBy.toString() == userId.toString();
    if (!isAdmin) {
      throw new AuthorizationError("Only admins can update match");
    }
    const match = await Match.findById(matchId);
    if (!match || match.status == "ended") {
      throw new BadrequestError("Match has progressed and cannot be modified");
    }
    await Match.findByIdAndUpdate(matchId, update);
  } catch (error) {
    throw error;
  }
}
