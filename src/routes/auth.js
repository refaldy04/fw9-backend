const auth = require('express').Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');

const registerValidation = [
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

const createPinValidation = [body('email').isEmail().withMessage('Email format invalid'), body('pin').isLength({ min: 6, max: 6 }).withMessage('PIN length invalid').isNumeric().withMessage('PIN must be a number')];

const loginValidation = [body('email').isEmail().withMessage('Email format invalid')];

auth.post('/register', ...registerValidation, authController.register);
auth.post('/createPin', ...createPinValidation, authController.createPin);
auth.post('/login', ...loginValidation, authController.login);

module.exports = auth;
