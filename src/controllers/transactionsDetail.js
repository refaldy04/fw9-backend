exports.getAllTransactionDetail = (req, res) => {
  return res.json({
    success: true,
    message: 'List all transactions detail in this week',
  });
};
