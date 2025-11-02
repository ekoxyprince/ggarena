import mongoose from "mongoose";
import Match from "../../database/models/match.js";

export default async function (tournamentId) {
  const matches = await Match.aggregate([
    {
      $match: {
        tournament: new mongoose.Types.ObjectId(tournamentId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "playerA",
        foreignField: "_id",
        as: "playerA",
      },
    },
    {
      $unwind: {
        path: "$playerA",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "playerB",
        foreignField: "_id",
        as: "playerB",
      },
    },
    {
      $unwind: {
        path: "$playerB",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$round",
        matches: { $push: "$$ROOT" },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 1,
        matches: {
          _id: 1,
          round: 1,
          playerA: {
            fullname: 1,
            profilePic: 1,
          },
          playerB: {
            fullname: 1,
            profilePic: 1,
          },
          scoreA: 1,
          scoreB: 1,
          status: 1,
          tournament: 1,
        },
      },
    },
  ]);
  console.log(matches);
  return matches;
}
