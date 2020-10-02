const server = require('express').Router();
const { User } = require('../db');
const Sequelize = require('sequelize');
const passport = require('passport');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { checkAuth } = require('./middlewares');


server.post('/register', function(req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) return next(err);
        req.body.password = hash;
      });
    });
    User.findOne(
    { 
        where: 
        {
            username: req.body.username
        }
    })
    .then( user => {
        if(user){
            return res.send('usuario existente: ', user)
        }
        User.create(req.body)
        .then((user) => {
            res.send('Usuario creado con éxito. ')
        })
    })
    .catch(err => {
        console.log(err)
    })
});


server.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('ESTOY INTENTANDO HACER EL POST');
    
    console.log(req.user);
    res.send({id: req.user.id, firstname: req.user.firstname, role: req.user.role});
});

server.get('/logout', checkAuth, (req, res) => {
  console.log('Good Bye')
    req.logout();
});

server.get('/me', checkAuth, (req, res) => {
    res.send(req.user)
});

module.exports = server;