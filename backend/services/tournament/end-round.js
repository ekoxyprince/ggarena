import Tournament from "../../database/models/tournament.js";
import Match from "../../database/models/match.js";
import {
  AuthorizationError,
  BadrequestError,
} from "../../http/exceptions/error.js";
import MatchHelper from "../../utils/match-helper.js";
const helper = new MatchHelper();

export default async function (tournamentId, userId, round) {
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
      throw new AuthorizationError("Only admins can end round");
    }
    if (tournament.status != "live") {
      throw new BadrequestError(
        `Changes are not allowed. Tournament has progressed to ${tournament.status} stage and can no longer be modified.`
      );
    }
    const match = await Match.findOne({
      tournament: tournamentId,
      status: "scheduled",
    });
    if (match) {
      throw new BadrequestError(
        "All previous matches must be completed before the next round."
      );
    }
    if (tournament.currentRound != round) {
      throw new BadrequestError(
        "Tournament has already progressed beyond current round."
      );
    }
    const noOfParticipants = tournament.participants.filter(
      (p) => p.isEliminated == false
    ).length;
    if (noOfParticipants < 2) {
      tournament.status = "ended";
    } else {
      let groupedPlayers = helper.groupPlayers(
        tournament.participants.filter((p) => p.isEliminated == false)
      );
      let arrangedPlayers = helper.arrangeGroupedPlayers(
        groupedPlayers,
        tournamentId,
        tournament.currentRound + 1
      );
      tournament.currentRound += 1;
      await Match.insertMany(arrangedPlayers);
    }
    await tournament.save();
  } catch (error) {
    throw error;
  }
}
