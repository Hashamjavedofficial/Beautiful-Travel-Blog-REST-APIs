const express = require("express");

const { getUsers, signIn, signUp } = require("../controller/user-controller");
const router = express.Router();

router.get("/", getUsers);

router.post("/signup", signUp);

router.post("/signin", signIn);

module.exports = router;
