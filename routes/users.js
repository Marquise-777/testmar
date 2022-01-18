const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const users = require('../controller/user');
const passport = require('passport');

router.get('/register', users.renderRegister);

router.post('/register', catchAsync(users.postRegister));

router.get('/login', users.renderLogin);

router.post('/login',passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.postLogin);

router.get('/logout', users.logout)

module.exports = router;