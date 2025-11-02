import { v2 } from "cloudinary";
import config from "../config/env.js";
const cloudinary = v2;

class Cloudinary {
  constructor() {
    this.setup();
  }
  setup() {
    cloudinary.config({
      api_key: config.cloudinary_api_key,
      api_secret: config.cloudinary_api_secret,
      cloud_name: config.cloudinary_cloud_name,
    });
  }
  uploadSingleImageToCloudinary(file) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            unique_filename: true,
            use_filename: true,
            folder: "ggarena/assets/images",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(file.buffer);
    });
  }
}

export default new Cloudinary();
