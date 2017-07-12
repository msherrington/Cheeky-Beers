function customResponses(req, res, next) {
  res.notFound = function notFound() {
    const err = new Error('Not found');
    err.status = 404;
    throw err;
  };
  next();
}

module.exports = customResponses;
