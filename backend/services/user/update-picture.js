import User from "../../database/models/user.js";
import cloudinary from "../../storage/cloudinary.js";

export default async function (userId, file) {
  try {
    const image = (await cloudinary.uploadSingleImageToCloudinary(file))
      .secure_url;
    await User.findByIdAndUpdate(userId, { profilePic: image });
  } catch (error) {
    throw error;
  }
}
