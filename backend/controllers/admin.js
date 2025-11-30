import catchAsync from "../utils/catchAsync.js";
import path from "node:path";
import User from "../database/models/user.js";
import bcrypt from "bcryptjs";
import Tournament from "../database/models/tournament.js";
import Community from "../database/models/community.js";
import Order from "../database/models/order.js";
import Game from "../database/models/game.js";
import Platform from "../database/models/platform.js";
import Payment from "../database/models/payment.js";

export const getSignin = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  res.render("./signin", {
    data: flashData,
  });
});

export const signinAdmin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, role: "admin" });
  if (!user) {
    req.flash("data", {
      success: false,
      message: "Incorrect creditials",
    });
    return res.redirect("/admin/signin");
  }
  console.log("Admin", user);
  const doMatch = await bcrypt.compare(password, user.password);
  console.log("Match", doMatch);
  if (!doMatch) {
    req.flash("data", {
      success: false,
      message: "Incorrect creditials",
    });
    return res.redirect("/admin/signin");
  }
  req.session.user = user;
  req.session.isLoggedIn = true;
  res.redirect("/admin/dashboard");
});
export const getDashboard = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;

  // Today’s start + end times
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // ========== TOTAL COUNTS ==========
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalTournaments = await Tournament.countDocuments();
  const totalCommunities = await Community.countDocuments();
  const totalOrders = await Order.countDocuments();

  // ========== TODAY COUNTS ==========
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

  // ========== LAST TOURNAMENTS WITH PARTICIPANTS ==========
  const latestTournaments = await Tournament.find()
    .sort({ createdAt: -1 }) // or createdAt if you prefer
    .limit(10)
    .populate({
      path: "participants.user",
      select: "fullname profilePic", // Only these fields
    });

  console.log(latestTournaments[0].participants);
  // Render dashboard
  res.render("./dashboard", {
    data: flashData,

    // Total stats
    totalUsers,
    totalTournaments,
    totalCommunities,
    totalOrders,

    // Today stats
    usersToday,
    tournamentsToday,
    communitiesToday,
    ordersToday,

    // Last tournaments
    latestTournaments,
  });
});

export const getGames = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  res.render("./games", {
    data: flashData,
    games: await Game.find(),
  });
});
export const createGames = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  res.render("./create-game", {
    data: flashData,
  });
});
export const createGamePost = catchAsync(async (req, res) => {
  await Game.create(req.body);
  req.flash("data", { success: true, message: "Game added" });
  res.redirect("/admin/create-game");
});
export const updateGames = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  res.render("./update-game", {
    data: flashData,
    game: await Game.findById(req.params.id),
  });
});
export const updateGamePost = catchAsync(async (req, res) => {
  await Game.findByIdAndUpdate(req.params.id, req.body);
  req.flash("data", { success: true, message: "Game update" });
  res.redirect(`/admin/update-game/${req.params.id}`);
});
export const createPlatforms = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  res.render("./create-platform", {
    data: flashData,
  });
});
export const createPlatformPost = catchAsync(async (req, res) => {
  await Platform.create(req.body);
  req.flash("data", { success: true, message: "Platform added" });
  res.redirect("/admin/create-platform");
});
export const updatePlatforms = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  res.render("./update-platform", {
    data: flashData,
    platform: await Platform.findById(req.params.id),
  });
});
export const updatePlatformPost = catchAsync(async (req, res) => {
  await Platform.findByIdAndUpdate(req.params.id, req.body);
  req.flash("data", { success: true, message: "Platform update" });
  res.redirect(`/admin/update-platform/${req.params.id}`);
});
export const getPlatforms = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  res.render("./platforms", {
    data: flashData,
    platforms: await Platform.find(),
  });
});
export const getCommunities = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  const communities = await Community.find()
    .populate("participants.user")
    .populate("createdBy");
  console.log(communities);
  res.render("./communities", {
    data: flashData,
    communities,
  });
});
export const getTournaments = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  const tournaments = await Tournament.find()
    .populate("participants.user")
    .populate("hostedBy");
  console.log(tournaments);
  res.render("./tournaments", {
    data: flashData,
    tournaments,
  });
});

export const updateCommunity = catchAsync(async (req, res) => {
  await Community.findByIdAndUpdate(req.query.id, {
    isVerified: req.query.isActive == "true" ? true : false,
  });
  req.flash("data", { success: true, message: "Community update" });
  res.redirect(`/admin/communities`);
});

export const getUsers = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  const users = await User.find({ role: "user" });
  res.render("./users", {
    data: flashData,
    users,
  });
});
export const getPayments = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  const payments = await Payment.find();
  res.render("./payments", {
    data: flashData,
    payments,
  });
});
export const getOrders = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  const orders = await Order.find()
    .populate("product")
    .populate("community")
    .populate("payment");
  res.render("./orders", {
    data: flashData,
    orders,
  });
});
export const updateOrderNow = catchAsync(async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, { status: "completed" });
  req.flash("data", { success: true, message: "Order updated" });
  return res.redirect(`/admin/orders`);
});
export const getReset = catchAsync(async (req, res) => {
  const flashData = req.flash("data")[0] || null;
  res.render("./reset", {
    data: flashData,
  });
});

export const updatePassword = catchAsync(async (req, res) => {
  const { cpassword, password } = req.body;
  const doMatch = await bcrypt.compare(cpassword, req.user.password);
  if (!doMatch) {
    req.flash("data", {
      success: false,
      message: "Incorrect password",
    });
    return res.redirect("/admin/reset-password");
  }
  req.user.password = password;
  await req.user.save();
  req.flash("data", {
    success: true,
    message: "Password updated",
  });
  return res.redirect("/admin/reset-password");
});
export const logoutUser = catchAsync(async (req, res) => {
  await req.session.destroy();
  res.redirect("/admin/signin");
});
