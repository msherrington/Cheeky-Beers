const User = require('../models/user');

function userSession(req, res, next) {
  if(!req.session.isAuthenticated) return next();

  User
    .findById(req.session.userId)
    .then((user) => {
      if(!user) {
        res.redirect('/');
      }
      req.session.userId = user.id;
      res.locals.user = user;
      res.locals.isAuthenticated = true;
      next();
    });
}

module.exports = userSession;
