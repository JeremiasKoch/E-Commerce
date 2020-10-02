const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const { User } = require('./db');
const bcrypt = require('bcryptjs');

require('./db.js');

const server = express();

passport.use(new Strategy({usernameField: 'username', passwordField: 'password'},
  function(username, password, done) {
    User.findOne({ where: { username: username }})
      .then((user) => {
        bcrypt.compare(password, user.password, function(err, res) {
          if (err) return done(err);
          if (res === false) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
      })
    .catch(err => {
      return done(err);
    })
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('ID', id);
  User.findByPk(id)
    .then((user) => {
      console.log('desere', user)
      done(null, user.get());
    })
    .catch(err => {
      return done(err);
    })
});

server.name = 'API';
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());

// Middleware para mostrar la sesión actual en cada request
server.use((req, res, next) => {
  console.log('SESSION',req.session);
  console.log('USER', req.user);
  next();
});

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
  next();
});
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials : true
}
server.use(cors(corsOptions));
server.use(`/uploads`, express.static(path.join(__dirname, '/routes/uploads')));
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
