const errorHandlerMiddleware = (error, req, res, next) => {
  {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "Unknow error occured" });
  }
};

module.exports = {
  errorHandlerMiddleware,
};
