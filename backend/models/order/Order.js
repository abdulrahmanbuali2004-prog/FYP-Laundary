const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    items: [
      {
        clothingType: { type: String, required: true },
        serviceType: { type: String, required: true },
        quantity: { type: Number, required: true }
      }
    ],

    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "picked_up",
        "washing",
        "out_for_delivery",
        "completed"
      ],
      default: "pending"
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },

    pickupDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },

    totalPrice: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
