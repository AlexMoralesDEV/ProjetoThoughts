const express = require('express');
const route = express.Router();
const AuthController = require('../src/controllers/authController');

route.get('/login', AuthController.login);
route.get('/register', AuthController.register);

module.exports = route;