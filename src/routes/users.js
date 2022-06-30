const users = require('express').Router();
const usersController = require('../controllers/users');

users.get('/', usersController.getAllUsers);
users.post('/', ...usersController.creatUsers);
users.patch('/:id', usersController.editUser);
users.delete('/:id', usersController.deleteUser);

module.exports = users;
