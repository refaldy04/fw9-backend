const users = require('express').Router();

const usersController = require('../controllers/users');

users.get('/', usersController.getAllUsers);
users.post('/', usersController.creatUsers);

module.exports = users;
