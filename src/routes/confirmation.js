const confirmation = require('express').Router();

const confirmationController = require('../controllers/confirmation');

confirmation.get('/', confirmationController.getConfirmation);

module.exports = confirmation;
