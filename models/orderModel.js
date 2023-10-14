const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  oderItems: [],
  deliver_User_Name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "ordered",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
