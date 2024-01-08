const express = require('express');
const route = express.Router();
const thoughtsController = require('./src/controllers/thoughtController');
const authController = require('./src/controllers/authController'); 
const { userExists } = require('./src/middlewares/middlewares');

route.get('/', thoughtsController.listar);
route.get('/register', authController.register);
route.get('/login', authController.login);
route.get('/logout', authController.sair);

route.get('/thoughtDashboard', userExists, thoughtsController.dashboard);

route.post('/register', authController.registrarDB);
route.post('/login', authController.logarDB);

module.exports = route;