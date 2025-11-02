import dotenv from "dotenv";
dotenv.config();
export default {
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "3000",
  url: process.env.DB_URL,
  db_name: process.env.DB_NAME,
  jwt_secret: process.env.JWT_SECRET,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  origins: [
    process.env.LOCAL_DOMAIN,
    process.env.REMOTE_DOMAIN,
    process.env.TEST_DOMAIN,
  ],
};
