import env from "./env.js";
export default {
  origin: (origin, cb) => {
    if (env.origins.includes(origin)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
