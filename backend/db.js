import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const MONGO_URI = process.env.MONGO_URI
const client = new MongoClient(MONGO_URI)

const connectDB = async () => {
    try{
        await client.connect();
        console.log("MongoDB connected successfully!");
        return client.db("DevsBlog")
    } catch(err) {
        console.error("MongoDB connection error",err);
        return null
    }
};
export default connectDB;