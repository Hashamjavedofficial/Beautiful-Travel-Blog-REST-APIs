const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send({
    name: "HAsham",
    age: 25,
  });
});

module.exports = router;
