import User from "../../database/models/user.js";
import { BadrequestError } from "../../http/exceptions/error.js";
import defaultMailoption from "../../utils/mail/default-mailoption.js";

export default async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    throw new BadrequestError("User already exists");
  }
  body.role = "user";
  const newUser = await User.create(body);
  await defaultMailoption(
    newUser.fullname,
    newUser.email,
    "Account Created",
    "Welcome to GGArena. Your no1 Tournament platform for hosting and engaging in various gaming tournaments"
  );
  await defaultMailoption(
    undefined,
    undefined,
    "New user alert",
    "New User has signed up into the system"
  );
  return newUser;
};
