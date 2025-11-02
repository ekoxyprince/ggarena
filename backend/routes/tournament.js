import { Router } from "express";
import * as controller from "../controllers/tournament.js";

const router = Router();
router.route("/").get(controller.getAll);
router.route("/:tournamentId").get(controller.get);
router.route("/:tournamentId/participant").patch(controller.participant);
router
  .route("/:tournamentId/match")
  .patch(controller.start)
  .post(controller.endTournamentRound)
  .get(controller.matches);
router
  .route("/:tournamentId/match/:matchId")
  .patch(controller.updateMatchPlayed)
  .post(controller.endMatchPlayed);

export default router;
