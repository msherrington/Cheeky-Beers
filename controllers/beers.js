const Beer = require('../models/beer');

function beersIndex(req, res) {
  Beer
    .find()
    .exec()
    .then((beers) => res.render('beers/index', { beers }))
    .catch((err) => {
      res.status(500).end(err);
    });
}

function beersNew(req, res) {
  res.render('beers/new');
}

function beersShow(req, res, next) {
  Beer
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) res.notFound();
      res.render('beers/show', { beer });
    })
    .catch(next);
}

function beersCreate(req, res) {
  Beer
    .create(req.body)
    .then((beer) => {
      req.flash('success', `${beer.name} has been added to the beer shelf.`);
      res.redirect('/beers');
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function beersEdit(req, res, next) {
  Beer
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) res.notFound();
      res.render('beers/edit', { beer });
    })
    .catch(next);
}

function beersUpdate(req, res, next) {
  Beer
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) return res.notFound();

      for(const field in req.body) {
        beer[field] = req.body[field];
      }

      return beer.save();
    })
    .then((beer) => {
      req.flash('success', `${beer.name} has been updated.`);
      res.redirect(`/beers/${beer.id}`);
    })
    .catch(next);
}

function beersDelete(req, res, next) {
  Beer
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) res.notFound();
      return beer.remove();
    })
    .then((beer) => {
      req.flash('success', `${beer.name} has been deleted.`);
      res.redirect('/beers');
    })
    .catch(next);
}

module.exports = {
  index: beersIndex,
  new: beersNew,
  create: beersCreate,
  show: beersShow,
  edit: beersEdit,
  update: beersUpdate,
  delete: beersDelete
};
