import User from "../../database/models/user.js";
import { BadrequestError } from "../../http/exceptions/error.js";
import defaultMailoption from "../../utils/mail/default-mailoption.js";

export default async (body) => {
  const user = await User.findOne({ email: body.email.toLowerCase() });
  const { email, ...details } = body;
  if (user) {
    throw new BadrequestError("User already exists");
  }
  body.role = "user";
  const newUser = await User.create({ email: email.toLowerCase(), ...details });
  await defaultMailoption(
    newUser.fullname,
    newUser.email,
    "Account Created",
    `<h5>Welcome to GG Arena.</h5>
<p>You’re now part of a global gaming community built for players, clubs, creators, and esports organisers.<p/>

<p>Our platform gives you a space to create communities, host tournaments, chat live, track your progress, and grow your gaming identity across all continents.<p/>

<p>We’re more than a tournament platform.<p>
<p>We’re building the ecosystem that connects gamers to opportunities, rewards, and real competition.<p/>

Glad to have you with us.
    `
  );
  await defaultMailoption(
    undefined,
    undefined,
    "New user alert",
    "New User has signed up into the system"
  );
  return newUser;
};
