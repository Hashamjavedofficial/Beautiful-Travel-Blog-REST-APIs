const multer = require("multer");
const uuid = require("uuid");

const MIME_TYPES = {
  "image/png": ".png",
  "image/jpeg": ".jpeg",
  "image/jpg": ".jpg",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPES[file.mimetype];
      cb(null, ext + "." + Date.now());
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPES[file.mimetype];
    let error = isValid ? null : new Error("Invalid file type");
    cb(error, isValid);
  },
});
// console.log(
//   uuid.v4({
//     random: [
//       0x10,
//       0x91,
//       0x56,
//       0xbe,
//       0xc4,
//       0xfb,
//       0xc1,
//       0xea,
//       0x71,
//       0xb4,
//       0xef,
//       0xe1,
//       0x67,
//       0x1c,
//       0x58,
//       0x36,
//     ],
//   })
// );
module.exports = fileUpload;
