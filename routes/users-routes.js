const express = require("express");
const { check } = require("express-validator");

const { getUsers, signIn, signUp } = require("../controller/user-controller");
const router = express.Router();

const signUpValidators = [
  check("name").notEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 5 }),
];

router.get("/", getUsers);

router.post("/signup", signUpValidators, signUp);

router.post("/signin", signIn);

module.exports = router;
