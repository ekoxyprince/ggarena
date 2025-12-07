import Tournament from "../../database/models/tournament.js";
import Match from "../../database/models/match.js";
import {
  AuthorizationError,
  BadrequestError,
} from "../../http/exceptions/error.js";
import MatchHelper from "../../utils/match-helper.js";
import User from "../../database/models/user.js";
import MailOptions from "../../utils/mail/default-mailoption.js";
const helper = new MatchHelper();

export default async function (tournamentId, userId, round) {
  try {
    const tournament = await Tournament.findById(tournamentId)
      .populate("game", "name")
      .populate("hostedBy", "name image participants createdBy")
      .populate("participants.user", "_id fullname profilePic");
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
    );
    if (noOfParticipants.length < 2) {
      tournament.status = "ended";
      const userWon = await User.findById(noOfParticipants[0].user._id);
      if (!userWon) throw new Error("No user found!");
      userWon.tournamentsWon += 1;
      userWon.points += 20;
      await userWon.save();
      MailOptions(
        userWon.fullname,
        userWon.email,
        "Tournament Won",
        `You won the ${tournament.fullname} tournament`
      );
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
