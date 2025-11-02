import Community from "../../database/models/community.js";
import User from "../../database/models/user.js";
import { BadrequestError } from "../../http/exceptions/error.js";

export default async function (userId, communityId) {
  const community = await Community.findById(communityId);
  if (!community) {
    throw new BadrequestError("invalid community ID");
  }
  const user = await User.findById(userId);
  const joined = community.participants.some(
    (c) => c.user.toString() == userId.toString()
  );
  console.log(joined);
  if (joined) {
    community.participants = community.participants.filter(
      (c) => c.user.toString() != userId.toString()
    );
    user.communitiesJoined -= 1;
  } else {
    if (community.participants.length >= community.maxUsers) {
      throw new BadrequestError("Group has been filled");
    }
    community.participants.push({
      user: userId,
      isAdmin: community.createdBy.toString() == userId.toString(),
    });
    user.communitiesJoined += 1;
  }
  await community.save();
  await user.save();
}
