const jwt = require("jsonwebtoken");
const { createError } = require("./error");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  
  if (!token) {
    return next(createError(403, "Please login"));
  }


  try {
    let data = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await User.findById(data._id);
    
    if (!req.user) {
      return next(createError(403, "User not found"));
    }

    next();
  } catch (error) {
    return next(createError(401, "Invalid token"));
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {

    next();
  } else {
    return next(createError(403, "You do not have permission to perform this action"));
  }
};

module.exports = {
  verifyToken,
  isAdmin
};
