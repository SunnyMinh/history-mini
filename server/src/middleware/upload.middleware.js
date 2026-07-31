const multer = require("multer");
const path = require("path");
const fs = require("fs");

const eventUploadDirectory =
  path.resolve(
    __dirname,
    "../../uploads/events"
  );
  
fs.mkdirSync(
  eventUploadDirectory,
  {
    recursive: true,
  }
);

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    callback
  ) => {
    callback(
      null,
      eventUploadDirectory
    );
  },

  filename: (
    req,
    file,
    callback
  ) => {
    const extension =
      path.extname(
        file.originalname
      ).toLowerCase();

    const uniqueName =
      `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${extension}`;

    callback(
      null,
      uniqueName
    );
  },
});

function imageFileFilter(
  req,
  file,
  callback
) {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (
    !allowedMimeTypes.includes(
      file.mimetype
    )
  ) {
    return callback(
      new Error(
        "Chỉ chấp nhận ảnh JPG, PNG hoặc WebP"
      )
    );
  }

  callback(null, true);
}

const uploadEventImage = multer({
  storage,

  fileFilter:
    imageFileFilter,

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },
});

module.exports = {
  uploadEventImage,
};