const users = require('express').Router();
const usersController = require('../controllers/users');
const { body } = require('express-validator');

users.get('/', usersController.getAllUsers);
users.post('/', body('email').isEmail(), body('username').isLength({ min: 4 }), usersController.creatUsers);
users.patch('/:id', usersController.editUser);
users.delete('/:id', usersController.deleteUser);

module.exports = users;
