import Tournament from "../../database/models/tournament.js";
import Community from "../../database/models/community.js";
import User from "../../database/models/user.js";
import cloudinary from "../../storage/cloudinary.js";

export default async function (body, file, community) {
  const cmmt = await Community.findById(community);
  if (!cmmt) {
    throw new Error("No community found");
  }
  const user = await User.findById(cmmt.createdBy.toString());
  user.tournamentsCreated += 1;
  await user.save();
  (body.image = (
    await cloudinary.uploadSingleImageToCloudinary(file)
  ).secure_url),
    (body.hostedBy = community);
  await Tournament.create(body);
}
