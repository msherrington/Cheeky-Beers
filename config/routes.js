const router = require('express').Router();

const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const beersController = require('../controllers/beers');

const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('static/index'));

router.route('/beers')
  .get(beersController.index)
  .post(secureRoute, beersController.create);

router.route('/beers/new')
  .get(secureRoute, beersController.new);

router.route('/beers/:id')
  .get(secureRoute, beersController.show)
  .put(secureRoute, beersController.update)
  .delete(secureRoute, beersController.delete);

router.route('/beers/:id/edit')
  .get(secureRoute, beersController.edit);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
