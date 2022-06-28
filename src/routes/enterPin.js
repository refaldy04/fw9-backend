const enterPin = require('express').Router();

const enterPinController = require('../controllers/enterPin');
const enterPinModels = require('../models/enterPin');

enterPin.get('/', enterPinController.getEnterPin);
enterPin.get('/', enterPinModels.confirmPin);

module.exports = enterPin;
