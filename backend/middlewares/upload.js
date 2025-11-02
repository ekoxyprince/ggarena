import multer from "multer";

const storage = multer.memoryStorage();

export const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});
