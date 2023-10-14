const express = require("express");
const { verifyToken, isAdmin } = require("../utils/authentication");
const {
  placeOrder,
  getAllOrder,
  getOrderById,
  deleteOrderById,
  statusOrdered,
} = require("../controller/orderController");

const router = express.Router();
router.route("/place-order").post(verifyToken, placeOrder);
router
  .route("/:id")
  .get(verifyToken, getOrderById)
  .delete(verifyToken, isAdmin, deleteOrderById);
router.route("/admin/getAllOrders").get(verifyToken, isAdmin, getAllOrder);
router.route("/order-status").post(verifyToken, isAdmin, statusOrdered);

module.exports = router;
