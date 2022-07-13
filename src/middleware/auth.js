const jwt = require('jsonwebtoken');
const responese = require('../helpers/standardResponse');

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const auth = req.headers.authorization;
    // console.log(auth);
    const prefix = 'Bearer';
    if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length + 1, auth.length);
      try {
        const result = jwt.verify(token, process.env.APP_SECRET || 'mYF1rStb4ck3nd');
        req.authUser = result;
        // console.log(result);
        next();
      } catch (e) {
        return responese(res, 'Token Expired', null, null, 401);
      }
    }
  } else {
    return responese(res, 'You should to login first', null, null, 401);
  }
};

module.exports = auth;
