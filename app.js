const express = require("express");
const bodyParser = require("body-parser");

const placesRoute = require("./routes/places-routes");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(placesRoute);

app.listen(port, () => {
  console.log("server running on port " + port);
});
