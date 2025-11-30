import Crypto from "node:crypto";
import User from "../../database/models/user.js";
import { BadrequestError } from "../../http/exceptions/error.js";
import defaultMailOptions from "../../utils/mail/default-mailoption.js";

export default async (resetToken, password) => {
  const hashedResetToken = Crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const user = await User.findOne({ resetToken: hashedResetToken });
  if (!user) {
    throw new BadrequestError("Invalid session try again!");
  }
  user.password = password;
  const updatedUser = await user.save();
  await defaultMailOptions(
    user.fullname,
    user.email,
    "Password Updated",
    `Password has been updated.`
  );
  return updatedUser;
};
