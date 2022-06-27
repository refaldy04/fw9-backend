exports.getConfirmation = (req, res) => {
  return res.json({
    success: true,
    message: 'are you sure with this data?',
  });
};
