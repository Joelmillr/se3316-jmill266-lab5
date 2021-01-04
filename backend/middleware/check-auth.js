const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //ensure token exists
    const token = req.headers.authorization.split(" ")[1];
    //verify token
    const decodedToken = jwt.verify(token, '3316A_Lab5_jmill266_secret');
    req.userData = { email: decodedToken.email, admin: decodedToken.admin, userId: decodedToken.userId };
    next();
  }
  catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
