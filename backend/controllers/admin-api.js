import catchAsync from "../utils/catchAsync.js";
import User from "../database/models/user.js";
import Tournament from "../database/models/tournament.js";
import Community from "../database/models/community.js";
import Order from "../database/models/order.js";
import Payment from "../database/models/payment.js";

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
