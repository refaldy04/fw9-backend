const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/transactions', require('./transactions'));
router.use('/profile', require('./profile'));
router.use('/transactionType', require('./transactionType'));
router.use('/auth', require('./auth'));

module.exports = router;
