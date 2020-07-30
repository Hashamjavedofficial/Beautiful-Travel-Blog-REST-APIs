const { validationResult } = require("express-validator");
const getLocation = require("../utils/getLocation");
let { DUMMY_PLACES } = require("../helper/DUMMY_DATA");
const Httperror = require("../helper/Httperror");

const getUser = (req, res, next) => {
  const userPlaces = DUMMY_PLACES.filter(
    (place) => place.creator === req.params.uid
  );
  if (userPlaces.length === 0) {
    throw new Httperror("Not found the user", 404);
  }
  res.status(200).send(userPlaces);
};

const getPlaces = (req, res, next) => {
  const place = DUMMY_PLACES.filter((place) => place.id === req.params.pid);
  if (place.length === 0) {
    return next(new Httperror("Not found the places", 404));
  }
  res.status(200).send({ place });
};

const newPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new Httperror("Input is not valid", 422));
  }

  const { id, title, description, address, creator } = req.body;
  try {
    const location = await getLocation(address);
    const place = {
      id,
      title,
      description,
      address,
      location,
      creator,
    };
    DUMMY_PLACES.push(place);
    res.status(201).json(place);
  } catch (error) {
    return next(new Httperror("Invalid location", 422));
  }
};

const updatePlaceById = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new Httperror("Invalid inputs", 422));
  }
  const checkKeys = Object.keys(req.body);
  const checkProperties = [
    "location",
    "title",
    "description",
    "address",
    "location",
    "creator",
  ];
  const isValid = checkKeys.every((key) => checkProperties.includes(key));
  if (!isValid) {
    return next(new Httperror("Property is Invalid", 400));
  }
  const newData = DUMMY_PLACES.map((place) => {
    if (place.id === req.params.id) {
      return checkKeys.forEach((key) => (place[key] = req.body[key]));
    } else {
      return place;
    }
  });
  DUMMY_PLACES = newData;
  res.status(201).json(newData);
};

const deletePlace = (req, res, next) => {
  res.status(200).json("Working");
};

module.exports = {
  getPlaces,
  getUser,
  newPlace,
  updatePlaceById,
  deletePlace,
};
