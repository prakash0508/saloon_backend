const express = require("express");

const router = express.Router();

const {
  postProduct,
  getProductById,
  allProducts,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");
const { verifyToken, isAdmin } = require("../utils/authentication");

router.post("/", verifyToken, isAdmin, postProduct);
router.get("/all-products", allProducts);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);
router.get("/single-product/:id", getProductById);

module.exports = router;
