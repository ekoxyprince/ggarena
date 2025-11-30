import jwt from "jsonwebtoken";
import { AuthenticationError } from "../http/exceptions/error.js";
import env from "../config/env.js";
import User from "../database/models/user.js";

export default async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token || typeof token == "undefined") {
      throw new AuthenticationError("invalid auth token");
    }
    const decoded = jwt.verify(token, env.jwt_secret);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new AuthenticationError("invalid auth token");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    if (!req.session.isLoggedIn) {
      req.flash("data", { success: false, message: "Invalid session" });
      return res.redirect("/admin/signin");
    }
    const user = await User.findOne({
      _id: req.session.user._id,
      role: "admin",
    });
    if (!user) {
      req.flash("data", { success: false, message: "Invalid session" });
      return res.redirect("/admin/signin");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
