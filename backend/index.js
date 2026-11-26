// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;
const dev_env = process.env.NODE_ENV || "development";

connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // Required so req.body works on POST /api/orders

app.use("/api/meals", productRoutes);
app.use("/api/orders", orderRoutes);

// Clean JSON error handler so frontend receives readable error messages
app.use((err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.listen(port, () => {
  console.log(`The server is running in ${dev_env} mode on port ${port}`);
});