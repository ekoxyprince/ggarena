import Platform from "../../database/models/platform.js";

export default async (id) => {
  const platform = await Platform.findById(id);
  return platform;
};
