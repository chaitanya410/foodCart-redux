import express from "express"
import asyncHandler from "../middleware/asyncHandler.js";
import Meals from "../models/productModel.js";

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    const meals = await Meals.find({});
    res.json(meals)
}));

router.get("/:id", asyncHandler(async (req, res) => {
    const meal_id = req.params.id;
    const meal = await Meals.findById(meal_id);
    res.json(meal)
}));

export default router