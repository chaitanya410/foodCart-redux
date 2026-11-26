// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import Meals from "./models/productModel.js";
// import User from "./models/userModel.js";
// import Order from "./models/orderModel.js";
// import users from "./data/user.js";
// import meals from "./data/products.js";
// import orders from "./data/orders.js";

// dotenv.config();

// connectDB();

// const importData = async () => {
//     try {
//         // 1. Clear all existing collections first so re-imports stay clean
//         await Order.deleteMany();
//         await Meals.deleteMany();
//         await User.deleteMany();

//         // 2. Insert users and grab the admin/default user ID
//         const createdUsers = await User.insertMany(users);
//         const adminUser = createdUsers[0]._id;
//         const customerUser = createdUsers[1]?._id || adminUser;

//         // 3. Insert meals into the Meals collection (this was missing before)
//         const sampleMeals = meals.map((meal) => {
//             return { ...meal, user: adminUser };
//         });
//         await Meals.insertMany(sampleMeals);

//         // 4. Insert sample orders linked to the customer user
//         const sampleOrders = orders.map((order) => {
//             return { ...order, user: customerUser };
//         });
//         await Order.insertMany(sampleOrders);

//         console.log("Data Imported! (Users, Meals & Orders)");
//         process.exit();
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// const destroyData = async () => {
//     try {
//         await Order.deleteMany();
//         await Meals.deleteMany();
//         await User.deleteMany();

//         console.log("Data Destroyed!");
//         process.exit();
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// if (process.argv[2] !== "-d") {
//     importData();
// } else {
//     destroyData();
// }

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import Meals from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import users from "./data/user.js";
import meals from "./data/products.js";
import orders from "./data/orders.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Checks root .env first, falls back to backend/.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });
if (!process.env.MONGO_URI) {
    dotenv.config({ path: path.resolve(__dirname, ".env") });
}

const importData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
        await Meals.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const customerUser = createdUsers[1]?._id || adminUser;

        const sampleMeals = meals.map((meal) => ({
            ...meal,
            user: adminUser,
        }));
        await Meals.insertMany(sampleMeals);

        const sampleOrders = orders.map((order) => ({
            ...order,
            user: customerUser,
        }));
        await Order.insertMany(sampleOrders);

        console.log("Data Imported! (Users, Meals & Orders)");
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
        await Meals.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] !== "-d") {
    importData();
} else {
    destroyData();
}