import Platform from "../../database/models/platform.js";

export default async () => {
  const platforms = await Platform.find();
  return platforms;
};
