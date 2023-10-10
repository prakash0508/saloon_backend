const Product = require("../models/product");
const { createError } = require("../utils/error");

exports.postProduct = async (req, res, next) => {
  try {
    const {
      Product_name,
      Product_Img_url,
      Product_description,
      Product_price,
      Product_category,
      Product_sub_category,
    } = req.body;

    const newProduct = new Product({
      Product_category,
      Product_name,
      Product_Img_url,
      Product_price,
      Product_description,
      Product_sub_category,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product uploaded", newProduct });
  } catch (error) {
    next(createError(404, "Product creation failed trt again"));
  }
};

exports.allProducts = async (req, res, next) => {
  try {
    const allProduct = await Product.find();
    res.status(201).json({ message: "All Products", allProduct });
  } catch (error) {
    next(createError(404, "Product not found"));
  }
};

// Update a Product product by ID
exports.updateProduct = async (req, res, next) => {
  try {
    const ProductId = req.params.id;

    const updatedData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      ProductId,
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

// Delete a Product product by ID
exports.deleteProduct = async (req, res, next) => {
  try {
    const ProductId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(ProductId);

    if (!deletedProduct) {
      return next(createError(404, "Product not found"));
    }

    res.status(200).json({ message: "Product deleted", deletedProduct });
  } catch (error) {
    next(createError(500, "Product deletion failed"));
  }
};

// Get a single product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const ProductId = req.params.id;

    const product = await Product.findById(ProductId);

    if (!product) {
      return next(createError(404, "Product not found"));
    }

    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    next(createError(500, "Error while fetching the product"));
  }
};
