exports.getEnterPin = (req, res) => {
  return res.json({
    success: true,
    message: 'Input your PIN here',
  });
};
