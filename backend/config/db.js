import mongoose from "mongoose"

const connectDB = async () => {
try {
const connect = await mongoose.connect(process.env.MONGO_URI)
console.log(`MongoDB Connected: ${connect.connection.host}`)
} catch (e) {
console.log(`Error: ${e.message}`)
process.exit(1);
}
}
export default connectDB;