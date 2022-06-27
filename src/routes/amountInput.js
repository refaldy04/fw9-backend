const amountInput = require('express').Router();

const amountInputController = require('../controllers/amountInput');

amountInput.post('/', amountInputController.postAmountInput);

module.exports = amountInput;
