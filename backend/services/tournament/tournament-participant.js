import Tournament from "../../database/models/tournament.js";
import User from "../../database/models/user.js";
import { BadrequestError } from "../../http/exceptions/error.js";
import MailOptions from "../../utils/mail/default-mailoption.js";

export default async function (tournamentId, userId) {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    throw new BadrequestError("invalid tournament ID");
  }
  if (tournament.status != "scheduled") {
    throw new BadrequestError("Tournament registration is closed");
  }
  const user = await User.findById(userId);
  const joined = tournament.participants.some(
    (c) => c.user.toString() == userId.toString()
  );

  if (joined) {
    tournament.participants = tournament.participants.filter(
      (c) => c.user.toString() != userId.toString()
    );
  } else {
    if (tournament.participants.length >= tournament.totalParticipants) {
      throw new BadrequestError(
        "Unable to join tournament. Tournament is already at maximum capacity"
      );
    }
    tournament.participants.push({
      user: userId,
      wins: 0,
      losses: 0,
      points: 0,
      isEliminated: false,
    });
    MailOptions(
      user.fullname,
      user.email,
      `Joined ${tournament.name} Tournament`,
      `You have successfully Joined the ${tournament.name} tournament`
    );
  }
  await tournament.save();
  await user.save();
}
