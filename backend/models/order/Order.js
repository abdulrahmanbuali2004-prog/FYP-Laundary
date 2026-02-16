const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    clothingType: {
      type: String,
      required: true,
      enum: ["pants", "shorts", "hoodies", "tshirts"],
    },
    serviceType: {
      type: String,
      required: true,
      enum: ["wash", "dry_clean", "ironing"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "picked_up",
        "washing",
        "out_for_delivery",
        "completed",
      ],
      default: "pending",
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    address: {
      type: String,
      required: true,
    },

    pickupDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },

    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
