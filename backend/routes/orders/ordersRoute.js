const express = require("express");
const router = express.Router();

const secureRoute = require("../../middleware/secureRoute");
const orderController = require("../../controllers/orderController");

// Create a new order 
router.post("/", secureRoute, orderController.createOrder);

// Get orders 
router.get("/", secureRoute, orderController.getAllOrders);

// Get one order by id
router.get("/:id", secureRoute, orderController.getOrderById);

// Update order status 
router.patch("/:id/status", secureRoute, orderController.updateOrderStatus);

// Delete 
router.delete("/:id", secureRoute, orderController.deleteOrder);

module.exports = router;
