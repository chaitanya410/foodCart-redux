import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: "String",
    required: true,
  },
  image: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  restaurant: {
    type: "String",
    required: true,
  },
  category: {
    type: "String",
    required: true,
  },
  price: {
    type: "Number",
    required: true,
  },
  rating: {
    type: "Number",
    required: true,
    default: 0,
  },
  countInStock: {
    type: "Number",
    required: true,
    default: 0,
  },
  numReviews: {
    type: "Number",
    required: true,
    default: 0,
  },
}, {
    timestamps: true
});

const Meals = mongoose.model("Meals", productSchema);

export default Meals;