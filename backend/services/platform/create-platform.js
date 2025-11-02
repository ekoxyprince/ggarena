import Platform from "../../database/models/platform.js";

export default async (body) => {
  const platform = await Platform.create(body);
  return platform;
};
