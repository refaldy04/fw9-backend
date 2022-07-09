const users = require('express').Router();
const usersController = require('../controllers/users');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');

const userValidation = [
  body('email').isEmail().withMessage('Email format invalid'),
  body('username').isLength({ min: 4 }).withMessage('Username length minimal 4 character'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password length min 8 character')
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
];

users.get('/user', body('limit').toInt(), body('page').toInt(), usersController.getAllUsers);
users.get('/user/:id', usersController.getUserById);
users.post('/user', ...userValidation, usersController.creatUsers);
users.patch('/user/:id', ...userValidation, usersController.editUser);
users.delete('/user/:id', usersController.deleteUser);

module.exports = users;
