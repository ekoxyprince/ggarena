import User from "../../database/models/user.js";
import Tournament from "../../database/models/tournament.js";
import Community from "../../database/models/community.js";

export default async function (userId) {
  try {
    const user = (
      await User.findById(userId).select({ password: 0 })
    ).toObject();
    user.communities = await Community.find({
      participants: {
        $elemMatch: { user: userId },
      },
    }).limit(10);
    user.tournaments = await Tournament.find({
      participants: {
        $elemMatch: { user: userId },
      },
    })
      .populate("game", "name")
      .populate("hostedBy", "name image participants createdBy")
      .populate("participants.user", "fullname profilePic");
    return user;
  } catch (error) {
    throw error;
  }
}
