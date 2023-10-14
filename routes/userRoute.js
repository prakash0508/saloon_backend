const express = require("express");

const router = express.Router();

const {
  register,
  login,
  me,
  updateUser,
  deleteUser,
  getUserById,
  getUserByUsername,
  getAllUsers ,
  changeUserRole,
  addCart,
  removeCart,
  subCart
} = require("../controller/userController");
const { verifyToken, isAdmin } = require("../utils/authentication");

router.route("/auth/register").post(register);
router.route("/auth/login").post(login);
router.route("/auth/me").get(verifyToken, me);
router.route("/auth/change-role").put(verifyToken, isAdmin,changeUserRole);
router.route("/auth/update-user").put(verifyToken, isAdmin,updateUser);
router.route("/auth/delete-user").delete(verifyToken, isAdmin,deleteUser);
router.route("/auth/all-users").get(verifyToken, isAdmin,getAllUsers);
router.route("/auth/:id").delete(verifyToken, isAdmin,getUserById);
router.route("/auth/:username").delete(verifyToken, isAdmin,getUserByUsername);
router.route("/add-cart").post(verifyToken,addCart);
router.route("/remove-cart").post(verifyToken,removeCart);
router.route("/sub-cart").post(verifyToken,subCart);

module.exports = router;
