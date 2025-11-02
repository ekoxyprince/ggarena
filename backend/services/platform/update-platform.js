import Platform from "../../database/models/platform.js";

export default async (id, body) => {
  const keys = Object.keys(body);
  const platform = await Platform.findById(id);
  for (let i = 0; i < keys.length; i++) {
    platform[keys[i]] = body[keys[i]];
  }
  const updatedPlatform = await platform.save();
  return updatedPlatform;
};
