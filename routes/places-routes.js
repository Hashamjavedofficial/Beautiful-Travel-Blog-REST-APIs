const express = require("express");
const { check } = require("express-validator");
const {
  getPlaces,
  getUser,
  newPlace,
  updatePlaceById,
  deletePlace,
} = require("../controller/places-controller");
const fileUpload = require("../middlewares/file-upload");
const auth = require("../middlewares/auth-middleware");

const router = express.Router();
const validatonForPost = [
  check("title").notEmpty(),
  check("description").isLength({ min: 5 }),
  check("address").notEmpty(),
];
const validationForPatch = [
  check("title").notEmpty(),
  check("description").isLength({ min: 5 }),
];
router.get("/user/:uid", getUser);

router.get("/:pid", getPlaces);

router.use(auth);

router.post("/", fileUpload.single("image"), validatonForPost, newPlace);

router.patch("/:pid", validationForPatch, updatePlaceById);

router.delete("/:pid", deletePlace);

module.exports = router;
