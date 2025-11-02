import Community from "../../database/models/community.js";
import cloudinary from "../../storage/cloudinary.js";

export default async (body, user, files) => {
  const [file1, file2] = files;
  let img = await cloudinary.uploadSingleImageToCloudinary(file1);
  let cover = await cloudinary.uploadSingleImageToCloudinary(file2);
  console.log(img, cover);
  body.image = img.secure_url;
  body.cover = cover.secure_url;
  body.participants = [
    {
      user: user._id,
      isAdmin: true,
    },
  ];
  body.createdBy = user._id;
  const community = await Community.create(body);
  user.communitiesCreated += 1;
  await user.save();
  return community;
};
