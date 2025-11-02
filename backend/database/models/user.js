import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      fullname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: String,
      tournamentsCreated: {
        type: Number,
        default: 0,
      },
      role: {
        type: String,
        default: "user",
      },
      communitiesJoined: {
        type: Number,
        default: 0,
      },
      tournamentsWon: {
        type: Number,
        default: 0,
      },
      communitiesCreated: {
        type: Number,
        default: 0,
      },
      profilePic: {
        type: String,
        default:
          "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
      },
      points: {
        type: Number,
        default: 0,
      },
      status: {
        type: String,
        default: "active",
      },
      authProvider: {
        type: String,
        default: "basic",
      },
      resetToken: String,
    },
    {
      timestamps: true,
    }
  ).pre("save", async function (next) {
    try {
      if (this.isNew || this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
      }
      next();
    } catch (error) {
      next(error);
    }
  })
);

export default User;
