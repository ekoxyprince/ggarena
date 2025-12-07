import catchAsync from "../utils/catchAsync.js";
import User from "../database/models/user.js";
import Tournament from "../database/models/tournament.js";
import Community from "../database/models/community.js";
import Order from "../database/models/order.js";
import Payment from "../database/models/payment.js";
import MailOptions from "../utils/mail/default-mailoption.js";

const getPaginationParams = (req) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const buildPaginatedData = (items, total, page, limit) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

// Dashboard stats for admin panel
export const getDashboardStats = catchAsync(async (req, res) => {
  // Today range
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // Totals
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalTournaments = await Tournament.countDocuments();
  const totalCommunities = await Community.countDocuments();
  const totalOrders = await Order.countDocuments();

  // Today counts
  const usersToday = await User.countDocuments({
    createdAt: { $gte: todayStart, $lte: todayEnd },
  });
  const tournamentsToday = await Tournament.countDocuments({
    createdAt: { $gte: todayStart, $lte: todayEnd },
  });
  const communitiesToday = await Community.countDocuments({
    createdAt: { $gte: todayStart, $lte: todayEnd },
  });
  const ordersToday = await Order.countDocuments({
    createdAt: { $gte: todayStart, $lte: todayEnd },
  });

  // Last 10 registered users (non-admin)
  const latestUsers = await User.find({ role: "user" })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("fullname email status createdAt profilePic");

  // Last 10 tournaments with participants
  const latestTournaments = await Tournament.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate({ path: "participants.user", select: "fullname profilePic" })
    .populate("hostedBy");

  res.status(200).json({
    success: true,
    message: "Dashboard stats retrieved",
    data: {
      totalUsers,
      totalTournaments,
      totalCommunities,
      totalOrders,
      usersToday,
      tournamentsToday,
      communitiesToday,
      ordersToday,
      latestUsers,
      latestTournaments,
    },
  });
});

// List all non-admin users (paginated + search)
export const getUsers = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req);
  const search = (req.query.search || "").trim();
  const searchRegex = search ? new RegExp(search, "i") : null;

  const filter = { role: "user" };
  if (searchRegex) {
    filter.$or = [{ fullname: searchRegex }, { email: searchRegex }];
  }

  const [total, users] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
  ]);

  res.status(200).json({
    success: true,
    message: "Users retrieved",
    data: buildPaginatedData(users, total, page, limit),
  });
});
export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find({ role: "user" });
  res.status(200).json({
    success: true,
    message: "Users retrieved",
    data: users,
  });
});
// Communities with participants & creator (paginated + search)
export const getCommunities = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req);
  const search = (req.query.search || "").trim();
  const searchRegex = search ? new RegExp(search, "i") : null;

  const filter = {};
  if (searchRegex) {
    filter.$or = [{ name: searchRegex }];
  }

  const [total, communities] = await Promise.all([
    Community.countDocuments(filter),
    Community.find(filter)
      .populate("participants.user")
      .populate("createdBy")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
  ]);

  res.status(200).json({
    success: true,
    message: "Communities retrieved",
    data: buildPaginatedData(communities, total, page, limit),
  });
});

export const updateCommunityStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isVerified } = req.body;

  const community = await Community.findByIdAndUpdate(
    id,
    { isVerified: !!isVerified },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Community status updated",
    data: community,
  });
});

// Tournaments overview (paginated + search)
export const getTournaments = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req);
  const search = (req.query.search || "").trim();
  const searchRegex = search ? new RegExp(search, "i") : null;

  const filter = {};
  if (searchRegex) {
    filter.$or = [{ name: searchRegex }, { status: searchRegex }];
  }

  const [total, tournaments] = await Promise.all([
    Tournament.countDocuments(filter),
    Tournament.find(filter)
      .populate("participants.user")
      .populate("hostedBy")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
  ]);

  res.status(200).json({
    success: true,
    message: "Tournaments retrieved",
    data: buildPaginatedData(tournaments, total, page, limit),
  });
});

// Admin: get single tournament with participants
export const getTournamentAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const tournament = await Tournament.findById(id)
    .populate("participants.user")
    .populate("hostedBy");

  if (!tournament) {
    return res
      .status(404)
      .json({ success: false, message: "Tournament not found" });
  }

  res.status(200).json({
    success: true,
    message: "Tournament retrieved",
    data: tournament,
  });
});

// Admin: create community (admin selects owning user)
export const createCommunityAdmin = catchAsync(async (req, res) => {
  const {
    name,
    image,
    cover,
    officialEmail,
    discordChannel,
    description,
    maxUsers,
    ownerId,
  } = req.body;

  if (
    !name ||
    !image ||
    !cover ||
    !officialEmail ||
    !discordChannel ||
    !description ||
    !ownerId
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Missing required fields: name, image, cover, officialEmail, discordChannel, description, ownerId",
    });
  }

  const owner = await User.findById(ownerId);
  if (!owner) {
    return res
      .status(404)
      .json({ success: false, message: "Owner user not found" });
  }

  const community = await Community.create({
    name,
    image,
    cover,
    officialEmail,
    discordChannel,
    description,
    maxUsers: maxUsers || 100,
    participants: [
      {
        user: owner._id,
        isAdmin: true,
      },
    ],
    createdBy: owner._id,
  });

  owner.communitiesCreated += 1;
  await owner.save();

  res.status(201).json({
    success: true,
    message: "Community created",
    data: community,
  });
});

// Admin: get single community with members
export const getCommunityAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const community = await Community.findById(id)
    .populate("participants.user")
    .populate("createdBy");

  if (!community) {
    return res
      .status(404)
      .json({ success: false, message: "Community not found" });
  }

  res.status(200).json({
    success: true,
    message: "Community retrieved",
    data: community,
  });
});

// Admin: remove a participant from a community
export const deleteCommunityParticipantAdmin = catchAsync(async (req, res) => {
  const { id, userId } = req.params;

  const community = await Community.findById(id).populate("participants.user");

  if (!community) {
    return res
      .status(404)
      .json({ success: false, message: "Community not found" });
  }

  const before = community.participants.length;
  community.participants = community.participants.filter(
    (p) => p.user.toString() !== userId.toString()
  );

  if (community.participants.length === before) {
    return res.status(404).json({
      success: false,
      message: "Participant not found in community",
    });
  }

  await community.save();

  res.status(200).json({
    success: true,
    message: "Participant removed",
    data: community,
  });
});

// Admin: update community details
export const updateCommunityAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const allowedFields = [
    "name",
    "image",
    "cover",
    "officialEmail",
    "discordChannel",
    "maxUsers",
    "description",
    "isVerified",
  ];

  const update = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) update[field] = req.body[field];
  });

  const community = await Community.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });

  if (!community) {
    return res
      .status(404)
      .json({ success: false, message: "Community not found" });
  }

  res.status(200).json({
    success: true,
    message: "Community updated",
    data: community,
  });
});

// Admin: delete community
export const deleteCommunityAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const community = await Community.findByIdAndDelete(id);

  if (!community) {
    return res
      .status(404)
      .json({ success: false, message: "Community not found" });
  }

  res.status(200).json({
    success: true,
    message: "Community deleted",
    data: community,
  });
});

// Admin: create tournament for any community
export const createTournamentAdmin = catchAsync(async (req, res) => {
  const {
    name,
    mode,
    game,
    totalParticipants,
    price,
    currency,
    overview,
    rules,
    image,
    hostedBy,
  } = req.body;

  if (
    !name ||
    !mode ||
    !game ||
    !totalParticipants ||
    !price ||
    !currency ||
    !overview ||
    !rules ||
    !image ||
    !hostedBy
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Missing required fields: name, mode, game, totalParticipants, price, currency, overview, rules, image, hostedBy",
    });
  }

  const community = await Community.findById(hostedBy);
  if (!community) {
    return res
      .status(404)
      .json({ success: false, message: "Host community not found" });
  }

  // Credit the community owner for a new tournament
  const owner = await User.findById(community.createdBy.toString());
  if (owner) {
    owner.tournamentsCreated += 1;
    await owner.save();
  }

  const tournament = await Tournament.create({
    name,
    mode,
    game,
    totalParticipants,
    price,
    currency,
    overview,
    rules,
    image,
    hostedBy,
  });

  res.status(201).json({
    success: true,
    message: "Tournament created",
    data: tournament,
  });
});

// Admin: update tournament details
export const updateTournamentAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const allowedFields = [
    "name",
    "mode",
    "game",
    "totalParticipants",
    "price",
    "currency",
    "overview",
    "rules",
    "image",
    "status",
    "isActive",
  ];

  const update = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) update[field] = req.body[field];
  });

  const tournament = await Tournament.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });

  if (!tournament) {
    return res
      .status(404)
      .json({ success: false, message: "Tournament not found" });
  }

  res.status(200).json({
    success: true,
    message: "Tournament updated",
    data: tournament,
  });
});

// Admin: delete tournament
export const deleteTournamentAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const tournament = await Tournament.findByIdAndDelete(id);

  if (!tournament) {
    return res
      .status(404)
      .json({ success: false, message: "Tournament not found" });
  }

  res.status(200).json({
    success: true,
    message: "Tournament deleted",
    data: tournament,
  });
});

// Admin: remove participant from tournament
export const deleteTournamentParticipantAdmin = catchAsync(async (req, res) => {
  const { id, userId } = req.params;

  const tournament = await Tournament.findById(id).populate(
    "participants.user"
  );

  if (!tournament) {
    return res
      .status(404)
      .json({ success: false, message: "Tournament not found" });
  }

  const before = tournament.participants.length;
  tournament.participants = tournament.participants.filter(
    (p) => p.user.toString() !== userId.toString()
  );

  if (tournament.participants.length === before) {
    return res.status(404).json({
      success: false,
      message: "Participant not found in tournament",
    });
  }

  await tournament.save();

  res.status(200).json({
    success: true,
    message: "Participant removed",
    data: tournament,
  });
});

// Orders + related payment/community/product (paginated + basic search by status)
export const getOrders = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req);
  const search = (req.query.search || "").trim().toLowerCase();

  const filter = {};
  if (search) {
    filter.status = search;
  }

  const [total, orders] = await Promise.all([
    Order.countDocuments(filter),
    Order.find(filter)
      .populate("product")
      .populate("community")
      .populate("payment")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
  ]);

  res.status(200).json({
    success: true,
    message: "Orders retrieved",
    data: buildPaginatedData(orders, total, page, limit),
  });
});

export const updateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    id,
    { status: status || "completed" },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Order status updated",
    data: order,
  });
});

// Payments overview (paginated + search)
export const getPayments = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req);
  const search = (req.query.search || "").trim();
  const searchRegex = search ? new RegExp(search, "i") : null;

  const filter = {};
  if (searchRegex) {
    filter.$or = [
      { fullname: searchRegex },
      { email: searchRegex },
      { reference: searchRegex },
      { status: searchRegex },
    ];
  }

  const [total, payments] = await Promise.all([
    Payment.countDocuments(filter),
    Payment.find(filter).sort({ _id: -1 }).skip(skip).limit(limit),
  ]);

  res.status(200).json({
    success: true,
    message: "Payments retrieved",
    data: buildPaginatedData(payments, total, page, limit),
  });
});

// Admin: update user points (add/deduct or set)
export const updateUserPoints = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { points, delta } = req.body;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (typeof points === "number") {
    user.points = points;
  } else if (typeof delta === "number") {
    user.points += delta;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User points updated",
    data: { _id: user._id, points: user.points },
  });
});

// Admin: send email to a user
export const sendUserEmail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { subject, message } = req.body;

  if (!subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Subject and message are required",
    });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Fire-and-forget using existing mail helper; errors are logged inside helper
  MailOptions(user.fullname, user.email, subject, message);

  res.status(200).json({
    success: true,
    message: "Email queued for sending",
  });
});
