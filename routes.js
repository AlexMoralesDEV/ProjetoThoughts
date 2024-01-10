const express = require('express');
const route = express.Router();
const thoughtsController = require('./src/controllers/thoughtController');
const authController = require('./src/controllers/authController'); 
const { userExists } = require('./src/middlewares/middlewares');

route.get('/thought/add', userExists, thoughtsController.createThought);
route.get('/thought/dashboard', userExists, thoughtsController.dashboard);
route.get('/', thoughtsController.listar);

route.post('/thought/add', thoughtsController.create);

route.get('/register', authController.register);
route.get('/login', authController.login);
route.get('/logout', authController.sair);


route.post('/register', authController.registrarDB);
route.post('/login', authController.logarDB);

module.exports = route;