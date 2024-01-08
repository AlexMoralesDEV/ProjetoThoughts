const express = require('express');
const route = express.Router();
const thoughtsController = require('./src/controllers/thoughtController');
const authController = require('./src/controllers/authController');

route.get('/', thoughtsController.listar);
route.get('/register', authController.register);
route.get('/login', authController.login);
route.get('/logout', authController.sair);

route.post('/register', authController.registrarDB);

module.exports = route;