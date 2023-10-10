const mongoose = require("mongoose");
const ProductModel = new mongoose.Schema(
  {
    Product_name: {
      type: String,
      required: true,
    },
    Product_Img_url: {
      type: String,
      required: true,
    },
    Product_description: {
      type: String,
    },
    Product_price: {
      type: Number,
      required: true,
    },
    Product_category: {
      type: String,
      required: true,
    },
    Product_sub_category: {
      type: String,
      required: true,
    },
    In_stock : {
      type: Number,
      default : 1 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductModel);
