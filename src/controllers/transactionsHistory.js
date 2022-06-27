exports.getAllTransactionHistory = (req, res) => {
  return res.json({
    success: true,
    message: 'List all user transactions history',
  });
};
