const users = require('express').Router();

const usersController = require('../controllers/users');

users.get('/', usersController.getAllUsers);
users.post('/', usersController.creatUsers);
users.patch('/:id', usersController.editUser);

module.exports = users;
