import createCommunity from "../services/community/create-community.js";
import getCommunities from "../services/community/get-communities.js";
import getCommunity from "../services/community/get-community.js";
import updateImage from "../services/community/update-image.js";
import catchAsync from "../utils/catchAsync.js";
import communityParticipant from "../services/community/community-participant.js";
import createTournament from "../services/tournament/create-tournament.js";
import communityTournament from "../services/tournament/community-tournament.js";

export const create = catchAsync(async (req, res) => {
  await createCommunity(req.body, req.user, req.files);
  res.status(200).json({ success: true, message: "Community created" });
});

export const getAll = catchAsync(async (req, res) => {
  const communities = await getCommunities(req.query.q);
  res
    .status(200)
    .json({ success: true, message: "retrieved", data: communities });
});

export const get = catchAsync(async (req, res) => {
  const community = await getCommunity(req.params.communityId, req.user._id);
  res
    .status(200)
    .json({ success: true, message: "retrieved", data: community });
});

export const updatePics = catchAsync(async (req, res) => {
  await updateImage(req.body.type, req.file, req.params.communityId);
  res.status(200).json({ success: true, message: `Community updated!` });
});

export const communityParticpant = catchAsync(async (req, res) => {
  await communityParticipant(req.user._id, req.params.communityId);
  res.status(200).json({ success: true, message: `success` });
});

export const createCommunityTournament = catchAsync(async (req, res) => {
  await createTournament(req.body, req.file, req.params.communityId);
  res.status(200).json({ success: true, message: "Tournament created" });
});

export const getCommunityTournament = catchAsync(async (req, res) => {
  const data = await communityTournament(req.params.communityId);
  res.status(200).json({ success: true, message: "Retrieved", data });
});
