const transactionsType = require('express').Router();
const transactionsTypeController = require('../controllers/transactionType');

transactionsType.get('/transactionType', transactionsTypeController.getAllTransactionType);
transactionsType.get('/transactionType/:id', transactionsTypeController.getTransactionTypeById);
transactionsType.post('/transactionType', transactionsTypeController.createTransactionType);
transactionsType.patch('/transactionType/:id', transactionsTypeController.editTransactionType);
transactionsType.delete('/transactionType/:id', transactionsTypeController.deleteTransactionType);

module.exports = transactionsType;
