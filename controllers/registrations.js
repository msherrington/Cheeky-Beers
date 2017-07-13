const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('success', `Thanks for registering ${user.username}!`);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err.name);
      if(err.name === 'ValidationError') {
        req.flash('danger', 'Passwords must match. Please try again');
        res.redirect('/register');
      }
      res.status(500).end();
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
