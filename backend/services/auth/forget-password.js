import User from "../../database/models/user.js";
import { BadrequestError } from "../../http/exceptions/error.js";
import Crypto from "node:crypto";
import defaultMailOptions from "../../utils/mail/default-mailoption.js";
import env from "../../config/env.js";

export default async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadrequestError("No user found!");
  }
  const resetToken = Crypto.randomBytes(32).toString("hex");
  const hashedResetToken = await Crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetToken = hashedResetToken;
  await user.save();
  await defaultMailOptions(
    user.fullname,
    user.email,
    "Password Reset",
    `Click the link to reset Password <a href="https://${env.origins[1]}/reset-password/${resetToken}">Reset</a>`
  );
  return resetToken;
};
