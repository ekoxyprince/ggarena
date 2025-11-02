import mongoose from "mongoose";
import env from "../config/env.js";

const connectToDb = () => {
  return mongoose
    .connect(env.url, {
      dbName: env.db_name,
    })
    .then(() => {
      console.log("Connected to db");
    });
};

export default connectToDb;
