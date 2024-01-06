const express = require('express');
const route = express.Router();
const thoughtsController = require('../src/controllers/thoughtsController');

route.get('/', thoughtsController.showThoughts);

module.exports = route;