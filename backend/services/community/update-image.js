import Community from "../../database/models/community.js";
import cloudinary from "../../storage/cloudinary.js";

export default async (type, file, id) => {
  const community = await Community.findById(id);
  community[type] = (
    await cloudinary.uploadSingleImageToCloudinary(file)
  ).secure_url;
  await community.save();
};
