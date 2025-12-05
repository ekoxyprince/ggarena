import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import compression from "compression";
import helmet from "helmet";
import authRoutes from "./routes/auth.js";
import auth from "./middlewares/auth.js";
import { isAdmin } from "./middlewares/role.js";
import gameRoutes from "./routes/game.js";
import platformRoutes from "./routes/platform.js";
import communityRoutes from "./routes/community.js";
import tournamentRoutes from "./routes/tournament.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import paymentRoutes from "./routes/payment.js";
import orderRoutes from "./routes/order.js";
import adminRoutes from "./routes/admin.js";
import adminApiRoutes from "./routes/admin-api.js";
import corsOptions from "./config/corsOptions.js";
import cors from "cors";
import session from "express-session";
import Connect from "connect-mongodb-session";
import env from "./config/env.js";
import ejs from "ejs";
import path from "node:path";
import flash from "connect-flash";
const MongoDBStore = Connect(session);

const app = express();
const store = new MongoDBStore({
  uri: env.url,
  collection: "Session",
});
const __dirname = path.resolve();

app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "backend", "admin"));
app.use(compression());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.static("./backend/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: env.jwt_secret,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 1,
    },
  })
);
app.use(flash());
store.on("error", function (error) {
  console.log(error);
});
if (process.env.NODE_ENV == "production") {
  let frontendPath = path.join(__dirname, "frontend", "dist");
  app.use(express.static(frontendPath));
  app.get(/^\/(?!api)(?!admin).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
app.use("/api/auth", authRoutes);
app.use("/api/platforms", auth, platformRoutes);
app.use("/api/games", auth, gameRoutes);
app.use("/api/communities", auth, communityRoutes);
app.use("/api/tournaments", auth, tournamentRoutes);
app.use("/api/user", auth, userRoutes);
app.use("/api/products", auth, productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", auth, orderRoutes);
// Admin JSON APIs (protected, admin-only)
app.use("/api/admin", auth, isAdmin, adminApiRoutes);
// Existing EJS-based admin panel
// app.use("/admin", adminRoutes);
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not found!" });
});
app.use((err, req, res, next) => {
  if (typeof err.code == "number" && err.code < 500) {
    return res.status(err.code).json({ success: false, message: err.message });
  }
  console.log(err);
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
});

export default app;
