const express = require("express");

const { DUMMY_PLACES } = require("../helper/DUMMY_DATA");
const Httperror = require("../helper/Httperror");

const router = express.Router();

router.get("/user/:uid", (req, res, next) => {
  const userPlaces = DUMMY_PLACES.filter(
    (place) => place.creator === req.params.uid
  );
  if (userPlaces.length === 0) {
    throw new Httperror("Not found the user", 404);
  }
  res.status(200).send(userPlaces);
});

router.get("/:pid", (req, res, next) => {
  const place = DUMMY_PLACES.filter((place) => place.id === req.params.pid);
  if (place.length === 0) {
    return next(new Httperror("Not found the places", 404));
  }
  res.status(200).send({ place });
});

module.exports = router;
