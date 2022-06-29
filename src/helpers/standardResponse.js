const response = (res, msg, result, status = 200) => {
  let success = true;
  if (status >= 400) {
    success = false;
  }
  return res.status(status).json({
    success,
    message: msg,
    result,
  });
};

module.exports = response;
