const express = require("express");
const mongoose = require("mongoose");

const placesRoute = require("./routes/places-routes");
const userRoute = require("./routes/users-routes");

const { errorHandlerMiddleware } = require("./middlewares/error-handler");
const Httperror = require("./helper/Httperror");

const app = express();

app.use(express.json());
app.use("/api/places", placesRoute);
app.use("/api/users", userRoute);

app.use((req, res, next) => {
  next(new Httperror("Page not found", 404));
});

app.use(errorHandlerMiddleware);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    app.listen(process.env.PORT, () => {
      console.log("server running on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
