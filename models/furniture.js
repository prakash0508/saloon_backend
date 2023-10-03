const mongoose = require("mongoose");
const FurniturModal = new mongoose.Schema(
  {
    furniture_name: {
      type: String,
      required: true,
    },
    furniture_Img_url: {
      type: String,
      required: true,
    },
    furniture_description: {
      type: String,
    },
    furniture_price: {
      type: Number,
      required: true,
    },
    furniture_category: {
      type: String,
      required: true,
    },
    furniture_sub_category: {
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

module.exports = mongoose.model("Furniture", FurniturModal);
