import User from "../../database/models/user.js";

export default async function (userId, update) {
  try {
    await User.findByIdAndUpdate(userId, update);
  } catch (error) {
    throw error;
  }
}
