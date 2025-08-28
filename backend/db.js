import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);

let db;

const connectDB = async () => {
  if (db) return db; // reuse existing connection

  try {
    await client.connect();
    console.log("MongoDB connected successfully!");
    db = client.db("DevsBlog"); // store reference to DB
    return db;
  } catch (err) {
    console.error("MongoDB connection error", err);
    throw err;
  }
};
export default connectDB;