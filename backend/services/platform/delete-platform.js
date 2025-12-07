import Platform from "../../database/models/platform.js";

export default async (id) => {
  await Platform.findByIdAndDelete(id);
};
