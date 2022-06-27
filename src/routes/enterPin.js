const enterPin = require('express').Router();

const enterPinController = require('../controllers/enterPin');

enterPin.get('/', enterPinController.getEnterPin);

module.exports = enterPin;
