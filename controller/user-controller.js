const Httperror = require("../helper/Httperror");
const { validationResult } = require("express-validator");
const User = require("../models/users-model");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    if (users.length === 0) {
      return next(new Httperror("Sorry no user exists right now", 404));
    }
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (error) {
    return next(
      new Httperror("Ops something went wrong, try again later", 500)
    );
  }
};

const signUp = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new Httperror("Not valid inputs", 422));
  }
  try {
    const emailVerify = await User.findOne({ email: req.body.email });

    if (emailVerify) {
      return next(new Httperror("Email already exist, Please Signin", 422));
    }
    const user = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      image: req.file.path,
      places: [],
    });
    user.save().then((response) => {
      res.status(201).json({ user: response.toObject({ getters: true }) });
    });
  } catch (error) {
    return next(
      new Httperror("Ops something went wrong, Please try again later", 500)
    );
  }
};

const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return next(new Httperror("Invalid inputs, Try again", 422));
    }
    res.status(200).json({
      message: "Successfully login",
      user: user.toObject({ getters: true }),
    });
  } catch (error) {
    return next(
      new Httperror("Ops something went wrong, Try again later", 500)
    );
  }
};

module.exports = {
  getUsers,
  signIn,
  signUp,
};
