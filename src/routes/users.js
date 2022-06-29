const users = require('express').Router();

const usersController = require('../controllers/users');

users.get('/', usersController.getAllUsers);

module.exports = users;
