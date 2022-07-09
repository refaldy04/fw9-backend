const router = require('express').Router();

router.use('/admin', require('./users'));
router.use('/admin', require('./transactions'));
router.use('/admin', require('./profile'));
router.use('/admin', require('./transactionType'));
router.use('/auth', require('./auth'));
router.use('/', require('./auth'));

module.exports = router;
