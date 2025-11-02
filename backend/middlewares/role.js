import {
  AuthorizationError,
  BadrequestError,
} from "../http/exceptions/error.js";
import Community from "../database/models/community.js";

export const isUser = (req, res, next) => {
  if (req.user.role !== "user") {
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
    if (commuity.createdBy.toString() !== req.user._id.toString()) {
      throw new AuthorizationError("Forbidden");
    }
    next();
  } catch (error) {
    next(error);
  }
};
