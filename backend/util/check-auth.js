const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  console.log("Authorization header:", authHeader);  // Add this line to debug

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      return user;
    } catch (error) {
      throw new AuthenticationError('Invalid or expired token');
    }
  } else {
    throw new AuthenticationError('Authorization header must be provided');
  }
};


module.exports = checkAuth;
