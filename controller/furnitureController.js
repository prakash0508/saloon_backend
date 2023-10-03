const Furniture = require("../models/furniture");
const { createError } = require("../utils/error");

exports.postFurniture = async (req, res, next) => {
  try {
    const {
      furniture_name,
      furniture_Img_url,
      furniture_description,
      furniture_price,
      furniture_category,
      furniture_sub_category,
    } = req.body;

    const newProduct = new Furniture({
      furniture_category,
      furniture_name,
      furniture_Img_url,
      furniture_price,
      furniture_description,
      furniture_sub_category,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product uploaded", newProduct });
  } catch (error) {
    next(createError(404, "Product creation failed trt again"));
  }
};

exports.allProducts = async (req, res, next) => {
  try {
    const allProduct = await Furniture.find();
    res.status(201).json({ message: "All Products", allProduct });
  } catch (error) {
    next(createError(404, "Product not found"));
  }
};

// Update a furniture product by ID
exports.updateFurniture = async (req, res, next) => {
  try {
    const furnitureId = req.params.id;

    const updatedData = req.body;

    const updatedProduct = await Furniture.findByIdAndUpdate(
      furnitureId,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return next(createError(404, "Product not found"));
    }

    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    next(createError(500, "Product update failed"));
  }
};

// Delete a furniture product by ID
exports.deleteFurniture = async (req, res, next) => {
  try {
    const furnitureId = req.params.id;

    const deletedProduct = await Furniture.findByIdAndDelete(furnitureId);

    if (!deletedProduct) {
      return next(createError(404, "Product not found"));
    }

    res.status(200).json({ message: "Product deleted", deletedProduct });
  } catch (error) {
    next(createError(500, "Product deletion failed"));
  }
};

// Get a single product by ID
exports.getFurnitureById = async (req, res, next) => {
  try {
    const furnitureId = req.params.id;

    const product = await Furniture.findById(furnitureId);

    if (!product) {
      return next(createError(404, "Product not found"));
    }

    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    next(createError(500, "Error while fetching the product"));
  }
};
