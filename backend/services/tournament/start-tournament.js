import Tournament from "../../database/models/tournament.js";
import Match from "../../database/models/match.js";
import {
  AuthorizationError,
  BadrequestError,
} from "../../http/exceptions/error.js";
import MatchHelper from "../../utils/match-helper.js";
import MailOptions from "../../utils/mail/default-mailoption.js";
const helper = new MatchHelper();

export default async function (tournamentId, userId) {
  try {
    const tournament = await Tournament.findById(tournamentId)
      .populate("game", "name")
      .populate("hostedBy", "name image participants createdBy")
      .populate("participants.user", "fullname email profilePic");
    if (!tournament) {
      throw new BadrequestError("No tournament found");
    }
    const isAdmin =
      tournament.hostedBy.createdBy.toString() == userId.toString();
    if (!isAdmin) {
      throw new AuthorizationError("Only admins can start tournament");
    }
    if (tournament.status != "scheduled") {
      throw new BadrequestError(
        `Changes are not allowed. Tournament has progressed to ${tournament.status} stage and can no longer be modified.`
      );
    }
    if (tournament.participants.length != tournament.totalParticipants) {
      throw new BadrequestError(
        `Tournament registration is not complete. Please ensure all ${tournament.totalParticipants} participants are registered before proceeding.`
      );
    }
    let shuffledPlayers = helper.shufflePlayers(tournament.participants);
    let groupedPlayers = helper.groupPlayers(shuffledPlayers);
    let arrangedPlayers = helper.arrangeGroupedPlayers(
      groupedPlayers,
      tournamentId,
      0
    );
    tournament.status = "live";
    tournament.participants = shuffledPlayers;
    tournament.currentRound = 0;
    await Match.insertMany(arrangedPlayers);
    await tournament.save();
    for (let i = 0; i < tournament.participants.length; i++) {
      MailOptions(
        tournament.participants[i].user.fullname,
        tournament.participants[i].user.email,
        `Tournament started`,
        `This is to notify you that the ${tournament.name} tournament has started.`
      );
    }
  } catch (error) {
    throw error;
  }
}
