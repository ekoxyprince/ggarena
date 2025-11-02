import Community from "../../database/models/community.js";

export default async function (q) {
  const query = q && {
    name: { $regex: new RegExp(q) },
  };
  const communities = await Community.find(query || {}).populate(
    "participants.user",
    "fullname profilePic"
  );
  return communities;
}
