const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const routes = require('./config/routes');
const session = require('express-session');
const flash = require('express-flash');
const customResponses = require('./lib/customResponses');
const userSession = require('./lib/userSession');

const { port, env, dbURI } = require('./config/environment');

const app = express;
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

mongoose.connect(dbURI);

if(env !== 'test') app.use(morgan('dev'));

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'tell no-one your secret',
  resave: false,
  saveUninitalized: false
}));

app.use(flash());

app.use(userSession);

app.use(customResponses);
app.use(routes);

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';

  if(env === 'production') delete err.stack;
  res.status(err.status);
  res.locals.err = err;
  res.render(`static/${err.status}`);
  next(err);
});

app.listen(port, () => console.log(`Express is up and running on port ${port}`));
