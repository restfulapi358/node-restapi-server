// middleware/tokenValidator.js
const config = require('./config');

function validateApiToken(req, res, next) {

  const token = req.headers['x-api-token'];
  if (token !== config.KEY) {
    return res.status(401).json({ error: 'Invalid or missing x-api-token' });
  }
  next();
}

module.exports = validateApiToken;