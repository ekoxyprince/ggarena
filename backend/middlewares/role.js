import {
  AuthorizationError,
  BadrequestError,
} from "../http/exceptions/error.js";
import Community from "../database/models/community.js";

export const isUser = (req, res, next) => {
  // Allow regular users and admins to act on "user"-level routes
  if (!["user", "admin"].includes(req.user.role)) {
    throw new AuthorizationError("Forbidden");
  }
  next();
};
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new AuthorizationError("Forbidden");
  }
  next();
};

export const isCommunityAdmin = async (req, res, next) => {
  try {
    const commuity = await Community.findById(req.params.communityId);
    if (!commuity) {
      throw new BadrequestError("Invalid community");
    }
    // Allow the community creator OR a platform admin to manage community resources
    if (
      commuity.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      throw new AuthorizationError("Forbidden");
    }
    next();
  } catch (error) {
    next(error);
  }
};
