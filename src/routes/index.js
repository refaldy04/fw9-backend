const router = require('express').Router();

router.use('/transactionsHistory', require('./transactionsHistory'));
router.use('/transactionsDetail', require('./transactionsDetail'));
router.use('/receiver', require('./receiver'));
router.use('/amountInput', require('./amountInput'));
router.use('/confirmation', require('./confirmation'));
router.use('/enterPin', require('./enterPin'));
router.use('/users', require('./users'));

module.exports = router;
