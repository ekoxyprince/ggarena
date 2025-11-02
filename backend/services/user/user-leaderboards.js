import User from "../../database/models/user.js";

export default async function () {
  try {
    const leaderboard = await User.find().sort("-tournamentsWon").limit(20);
    return leaderboard;
  } catch (error) {
    throw error;
  }
}
