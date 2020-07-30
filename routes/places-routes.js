const express = require("express");

const {
  getPlaces,
  getUser,
  newPlace,
  updatePlaceById,
  deletePlace,
} = require("../controller/places-controller");

const router = express.Router();

router.get("/user/:uid", getUser);

router.get("/:pid", getPlaces);

router.post("/", newPlace);

router.patch("/:pid", updatePlaceById);

router.delete("/:pid", deletePlace);

module.exports = router;
