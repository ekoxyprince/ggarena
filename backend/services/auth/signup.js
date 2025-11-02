import User from "../../database/models/user.js";
import { BadrequestError } from "../../http/exceptions/error.js";

export default async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    throw new BadrequestError("User already exists");
  }
  body.role = "user";
  const newUser = await User.create(body);
  return newUser;
};
