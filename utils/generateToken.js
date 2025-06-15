const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'default_secret', {
    expiresIn: '7d',
  });
};

module.exports = generateToken;
