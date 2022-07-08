const auth = require('express').Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');

const userValidation = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('password length min 8 character')
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
  body('email').isEmail().withMessage('Email format invalid'),
  body('username').isLength({ min: 4 }).withMessage('Username length minimal 4 character'),
];

auth.post('/register', ...userValidation, authController.register);

module.exports = auth;
