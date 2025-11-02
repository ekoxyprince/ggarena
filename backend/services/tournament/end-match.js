import Tournament from "../../database/models/tournament.js";
import Match from "../../database/models/match.js";
import User from "../../database/models/user.js";
import {
  AuthorizationError,
  BadrequestError,
} from "../../http/exceptions/error.js";
import MatchHelper from "../../utils/match-helper.js";
const helper = new MatchHelper();

export default async function (tournamentId, matchId, userId) {
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
      throw new AuthorizationError("Only admins can edit match");
    }
    const match = await Match.findById(matchId);
    if (!match || match.status == "ended") {
      throw new BadrequestError("failed to modify match");
    }
    const picked = helper.pickWinner(match);
    if (picked.hasWinner) {
      const userWon = await User.findById(picked.winner);
      const userLost = await User.findById(picked.loser);
      if (!userWon || !userLost) throw new BadrequestError("user not found");
      const index1 = tournament.participants.findIndex(
        (p) => p.user._id.toString() == userWon._id.toString()
      );
      const index2 = tournament.participants.findIndex(
        (p) => p.user._id.toString() == userLost._id.toString()
      );
      if (index1 < 0 || index2 < 0)
        throw new BadrequestError("no participant found");
      userWon.tournamentsWon += 1;
      tournament.participants[index1].points += 20;
      tournament.participants[index1].wins += 1;
      tournament.participants[index2].isEliminated = true;
      tournament.participants[index2].losses += 1;
      match.status = "ended";
      await userWon.save();
    }
    await match.save();
    await tournament.save();
  } catch (error) {
    throw error;
  }
}
