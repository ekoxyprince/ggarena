import User from "../../database/models/user.js";
import { BadrequestError } from "../../http/exceptions/error.js";
import Crypto from "node:crypto";

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
  //send reset token via mail
  return resetToken;
};
