const auth = require('express').Router();
const authController = require('../controllers/auth');
const profileController = require('../controllers/profile');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/auth');

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
const changePasswordValidation = [
  body('newpassword')
    .isLength({ min: 8 })
    .withMessage('password length min 8 character')
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
];
const changePinValidation = [body('pin').isLength({ min: 6, max: 6 }).withMessage('PIN length invalid').isNumeric().withMessage('PIN must be a number')];
const changePhoneNumberValidation = [body('phonenumber').isMobilePhone(['id-ID']).withMessage('You are not from Indonesia')];
const transactionsValidation = [body('time').isISO8601().withMessage('Date format invalid (ISO8601)'), body('amount').isCurrency({ allow_negatives: false }).withMessage('Input invalid, positive number only')];

auth.post('/register', ...registerValidation, authController.register);
auth.post('/createPin', ...createPinValidation, authController.createPin);
auth.post('/login', ...loginValidation, authController.login);
auth.get('/profile', authMiddleware, authController.getUserData);
auth.get('/historyTransaction', authMiddleware, authController.getUserTransaction);
auth.get('/allProfile', authMiddleware, profileController.getAllProfile);
auth.patch('/profile', authMiddleware, authController.editProfile);
auth.patch('/changePassword', authMiddleware, ...changePasswordValidation, authController.changePassword);
auth.patch('/resetPassword/:id', ...changePasswordValidation, authController.resetPassword);
auth.patch('/changePin', authMiddleware, ...changePinValidation, authController.changePin);
auth.patch('/phone', authMiddleware, ...changePhoneNumberValidation, authController.changePhoneNumber);
auth.post('/phone', authMiddleware, ...changePhoneNumberValidation, authController.addPhoneNumber);
auth.post('/transfer', authMiddleware, ...transactionsValidation, authController.transfer);
auth.post('/topup', authMiddleware, authController.topup);
auth.post('/checkPin', authMiddleware, authController.checkPin);
auth.post('/checkEmail', authController.checkEmail);

module.exports = auth;
