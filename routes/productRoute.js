const express = require("express");

const router = express.Router();

const {
  postFurniture,
  getFurnitureById,
  allProducts,
  deleteFurniture,
  updateFurniture,
} = require("../controller/furnitureController");
const { verifyToken, isAdmin } = require("../utils/authentication");

router.post("/", verifyToken, isAdmin, postFurniture);
router.get("/all-products", allProducts);
router.put("/:id", verifyToken, isAdmin, updateFurniture);
router.delete("/:id", verifyToken, isAdmin, deleteFurniture);
router.get("/single-product/:id", getFurnitureById);

module.exports = router;
