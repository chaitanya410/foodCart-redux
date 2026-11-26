import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Meals from "../models/productModel.js";
import User from "../models/userModel.js";

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, userId } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items provided");
    }

    // Resolve a valid user ObjectId (uses provided userId or falls back to seeded user)
    let resolvedUserId = userId;
    if (!resolvedUserId) {
      const existingUsers = await User.find({}).limit(2);
      const fallbackUser = existingUsers[1] || existingUsers[0];
      if (!fallbackUser) {
        res.status(400);
        throw new Error("No user found in database. Run npm run data:import first.");
      }
      resolvedUserId = fallbackUser._id;
    }

    const dbItems = await Promise.all(
      orderItems.map(async (item) => {
        const meal = await Meals.findById(item.id || item.product);
        if (!meal) {
          res.status(404);
          throw new Error(`Meal not found: ${item.name}`);
        }
        return {
          name: meal.name,
          qty: Number(item.amount || item.qty),
          image: meal.image,
          price: meal.price,
          product: meal._id,
        };
      })
    );

    const itemsPrice = dbItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 499 ? 0 : 40;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    const order = await Order.create({
      user: resolvedUserId,
      orderItems: dbItems,
      shippingAddress: {
        address: shippingAddress?.address || "Campus Hostel Block B",
        city: shippingAddress?.city || "Pune",
        state: shippingAddress?.state || "Maharashtra",
        pincode: shippingAddress?.pincode || shippingAddress?.postalCode || "411001",
        country: shippingAddress?.country || "India",
      },
      paymentMethod: paymentMethod || "UPI Express",
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
    });

    res.status(201).json(order);
  })
);

// @desc    Get orders by user ID (or all recent orders if 'latest' is passed)
// @route   GET /api/orders/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const query =
      req.params.id === "latest" ? {} : { user: req.params.id };
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  })
);

export default router;