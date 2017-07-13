function indexRoute(req, res) {
  res.redirect('/beers');
}

module.exports = {
  index: indexRoute
};
