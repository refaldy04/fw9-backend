const profile = require('express').Router();
const profileController = require('../controllers/profile');
const { body } = require('express-validator');

const profileValidation = [
  body('balance').isCurrency().withMessage('Input invalid, number only'),
  body('picture').isURL().withMessage('URL format invalid my friend'),
  body('phone_number').isMobilePhone(['id-ID']).withMessage('You are not from Indonesia'),
];

profile.get('/profile', profileController.getAllProfile);
profile.get('/profile/:id', profileController.getProfileById);
profile.post('/profile', ...profileValidation, profileController.createProfile);
profile.patch('/profile/:id', ...profileValidation, profileController.editProfile);
profile.delete('/profile/:id', ...profileValidation, profileController.deleteProfile);

module.exports = profile;
