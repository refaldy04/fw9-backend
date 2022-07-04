const profile = require('express').Router();
const profileController = require('../controllers/profile');
const { body } = require('express-validator');

const profileValidation = [
  body('balance').isCurrency({ symbol: 'Rp' }).withMessage('Input invalid, number only'),
  body('picture').isURL().withMessage('URL format invalid my friend'),
  body('phone_number').isMobilePhone(['id-ID']).withMessage('You are not from Indonesia'),
];

profile.get('/', profileController.getAllProfile);
profile.get('/:id', profileController.getProfileById);
profile.post('/', ...profileValidation, profileController.createProfile);
profile.patch('/:id', ...profileValidation, profileController.editProfile);
profile.delete('/:id', ...profileValidation, profileController.deleteProfile);

module.exports = profile;
