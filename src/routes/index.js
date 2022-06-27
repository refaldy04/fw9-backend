const router = require('express').Router();

router.use('/transactionsHistory', require('./transactionsHistory'));
router.use('/transactionsDetail', require('./transactionsDetail'));
router.use('/receiver', require('./receiver'));
router.use('/amountInput', require('./amountInput'));

module.exports = router;
