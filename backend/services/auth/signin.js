import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../database/models/user.js";
import { BadrequestError } from "../../http/exceptions/error.js";
import env from "../../config/env.js";

export default async (email, password) => {
  const user = await User.findOne({ email, authProvider: "basic" });
  if (!user) {
    throw new BadrequestError("Incorrect creditials");
  }
  if (!bcrypt.compare(password, user.password)) {
    throw new BadrequestError("Incorrect creditials");
  }
  const accessToken = await jwt.sign({ id: user._id }, env.jwt_secret);
  return accessToken;
};
