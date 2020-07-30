const Httperror = require("../helper/Httperror");
const { validationResult } = require("express-validator");
const DUMMY_USERS = [
  {
    id: 87,
    name: "Hasham Javed",
    password: "rehanyasin87",
    email: "hasham@gmail.com",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).send(DUMMY_USERS);
};

const signUp = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new Httperror("Not valid inputs", 422));
  }
  const { name, email, password } = req.body;
  const userFound = DUMMY_USERS.find((user) => user.email === req.body.email);
  if (userFound) {
    return next(new Error("Email already exist!", 422));
  }
  const newUser = { id: Math.random(1, 1000), name, email, password };
  DUMMY_USERS.push(newUser);
  res.status(201).json(newUser);
};

const signIn = (req, res, next) => {
  const user = DUMMY_USERS.find((user) => user.email === req.body.email);
  if (!user || user.password !== req.body.password) {
    return next(new Error("Could not find user, invalid cresedential", 401));
  }

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  signIn,
  signUp,
};
