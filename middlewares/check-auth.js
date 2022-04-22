const JWT = require('jsonwebtoken');

function checkAuth(req, res, next) {
  try {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    const decoded = JWT.verify(token, process.env.JWT_KEY);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ payload: { error: 'Unauthorized' } });
  }
}

module.exports = checkAuth;
