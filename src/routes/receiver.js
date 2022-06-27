const receiver = require('express').Router();

const receiverController = require('../controllers/receiver');

receiver.get('/', receiverController.getAllReceiver);

module.exports = receiver;
