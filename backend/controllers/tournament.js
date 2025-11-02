import getTournament from "../services/tournament/get-tournament.js";
import getTournaments from "../services/tournament/get-tournaments.js";
import tournamentParticipant from "../services/tournament/tournament-participant.js";
import catchAsync from "../utils/catchAsync.js";
import startTournament from "../services/tournament/start-tournament.js";
import tournamentMatches from "../services/tournament/tournament-matches.js";
import updateMatch from "../services/tournament/update-match.js";
import endMatch from "../services/tournament/end-match.js";
import endRound from "../services/tournament/end-round.js";

export const getAll = catchAsync(async (req, res) => {
  const data = await getTournaments(req.query.q);
  res
    .status(200)
    .json({ success: true, message: "Tournaments retrieved", data });
});

export const get = catchAsync(async (req, res) => {
  const data = await getTournament(req.params.tournamentId, req.user._id);
  res
    .status(200)
    .json({ success: true, message: "Tournament retrieved", data });
});
export const participant = catchAsync(async (req, res) => {
  await tournamentParticipant(req.params.tournamentId, req.user._id);
  res.status(200).json({ success: true, message: "success" });
});

export const start = catchAsync(async (req, res) => {
  await startTournament(req.params.tournamentId, req.user._id);
  res.status(200).json({ success: true, message: "tournament started" });
});

export const matches = catchAsync(async (req, res) => {
  const data = await tournamentMatches(req.params.tournamentId);
  res.status(200).json({ success: true, message: "success", data });
});
export const updateMatchPlayed = catchAsync(async (req, res) => {
  const { tournamentId, matchId } = req.params;
  await updateMatch(tournamentId, matchId, req.user._id, req.body);
  res.status(200).json({ success: true, message: "Match updated" });
});
export const endMatchPlayed = catchAsync(async (req, res) => {
  const { tournamentId, matchId } = req.params;
  await endMatch(tournamentId, matchId, req.user._id);
  res.status(200).json({ success: true, message: "Match ended successfully" });
});

export const endTournamentRound = catchAsync(async (req, res) => {
  await endRound(req.params.tournamentId, req.user._id, req.body.round);
  res.status(200).json({ success: true, message: "round ended" });
});
