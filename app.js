const express = require("express");
const bodyParser = require("body-parser");

const placesRoute = require("./routes/places-routes");
const userRoute = require("./routes/users-routes");

const { errorHandlerMiddleware } = require("./middlewares/error-handler");
const Httperror = require("./helper/Httperror");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/places", placesRoute);
app.use("/api/users", userRoute);

app.use((req, res, next) => {
  next(new Httperror("Page not found", 404));
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log("server running on port " + port);
});
