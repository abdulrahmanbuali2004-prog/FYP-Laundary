const Order = require("../models/Order");


const createOrder = async (req, res) => {
  try {
    const { items, address, pickupDate, deliveryDate, totalPrice } = req.body;

    if (!items || !address || !pickupDate || !deliveryDate || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = await Order.create({
      user: req.user.id, // from JWT
      items,
      address,
      pickupDate,
      deliveryDate,
      totalPrice,
      status: "pending",
    });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAllOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      orders = await Order.find().populate("user driver");
    } else if (req.user.role === "driver") {
      orders = await Order.find({ driver: req.user.id }).populate("user");
    } else {
      orders = await Order.find({ user: req.user.id });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user driver");

    if (!order) {
      return res.sendStatus(404);
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.sendStatus(404);
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.sendStatus(404);
    }

    res.status(200).json(deletedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
