const router = require('express').Router();

router.get('/', (req, res) => res.render('static/index'));

router.all('*', (req, res) => res.notFound());

module.exports = router;
