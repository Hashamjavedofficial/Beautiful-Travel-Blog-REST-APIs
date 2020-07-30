const uuid = require("uuid");

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

const newPlace = (req, res, next) => {
  const { id, title, description, address, location, creator } = req.body;
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
};

const updatePlaceById = (req, res, next) => {
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
