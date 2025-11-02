import Community from "../../database/models/community.js";
import Tournament from "../../database/models/tournament.js";

export default async function () {
  try {
    const communities = await Community.aggregate([
      {
        $addFields: {
          members: { $size: "$participants" },
        },
      },

      {
        $sort: {
          members: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    const tournaments = await Tournament.aggregate([
      {
        $addFields: {
          members: { $size: "$participants" },
        },
      },
      {
        $sort: {
          members: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "communities",
          localField: "hostedBy",
          foreignField: "_id",
          as: "hostedBy",
        },
      },
      {
        $unwind: {
          path: "$hostedBy",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return { tournaments, communities };
  } catch (error) {
    throw error;
  }
}

// const tournaments = await Tournament.aggregate([
//   {
//     $addFields: {
//       members: { $size: "$participants" },
//     },
//   },
//   {
//     $sort: { members: -1 },
//   },
//   {
//     $limit: 10,
//   },
//   // Lookup (populate) users from participants.user
//   {
//     $lookup: {
//       from: "users", // collection name in MongoDB (usually lowercase plural of model)
//       localField: "participants.user",
//       foreignField: "_id",
//       as: "participantUsers",
//     },
//   },
//   // Optional: merge user data back into participants array
//   {
//     $addFields: {
//       participants: {
//         $map: {
//           input: "$participants",
//           as: "p",
//           in: {
//             $mergeObjects: [
//               "$$p",
//               {
//                 user: {
//                   $arrayElemAt: [
//                     {
//                       $filter: {
//                         input: "$participantUsers",
//                         as: "u",
//                         cond: { $eq: ["$$u._id", "$$p.user"] },
//                       },
//                     },
//                     0,
//                   ],
//                 },
//               },
//             ],
//           },
//         },
//       },
//     },
//   },
//   {
//     $project: {
//       participantUsers: 0, // remove temp lookup field
//     },
//   },
// ]);
