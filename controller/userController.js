const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const { createError } = require("../utils/error");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successfull", newUser });
  } catch (error) {
    if (error.keyValue.username) {
      next(createError(403, "Username Already exist"));
    } else if (error.keyValue.email) {
      next(createError(403, "Email Already exist"));
    }
  }
};

//Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(403, "User not found"));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return next(createError(403, "Invlaid credentials"));
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({ message: "Logged in", user, token });
  } catch (error) {
    next(error);
  }
};


exports.me = async(req, res, next)=>{
  try {

    const user = req.user 

    if(!user){
      return next(createError(404, "Usering not found"));
    }

    res.status(201).json({ message: "Your credential", user });
    
  } catch (error) {
    next(createError(404, "user failed"));
  }
}


// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id; // Assuming you pass the user ID as a parameter

    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    next(createError(500, "Error while fetching the user"));
  }
};

// Get user by username
exports.getUserByUsername = async (req, res, next) => {
  try {
    const username = req.params.username; 

    const user = await User.findOne({ username });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    next(createError(500, "Error while fetching the user"));
  }
};


// Update user information
exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id; 
    const updatedData = req.body; 

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({ message: "User updated", updatedUser });
  } catch (error) {
    next(createError(500, "User update failed"));
  }
};

// Delete user by ID
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({ message: "User deleted", deletedUser });
  } catch (error) {
    next(createError(500, "User deletion failed"));
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return next(createError(404, "No users found"));
    }

    res.status(200).json({ message: "All users", users });
  } catch (error) {
    next(createError(500, "Error while fetching users"));
  }
};

exports.changeUserRole = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const newRole = req.body.newRole; 

    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true } 
    );

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({ message: "User role changed", user });
  } catch (error) {
    next(createError(500, "User role change failed"));
  }
};



