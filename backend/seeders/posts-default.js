import process from "process";
import connectDB, { client } from "../config/db.js";

const defaultPosts = [
  {
    id: 0,
    title: "",
    category: "",
    isDefault: true,
    description: "",
    image: "",
    createdAt: Date.now(),
  },
];

// let db;
// (async () => {
//   try {
//     db = await connectDB();
//   } catch (err) {
//     console.log("failed to connect", err);
//     process.exit(1);
//   }
// })();


const settingDefaultPosts = async () => {
  try {
    const db = await connectDB();
    const collectionPosts = db.collection("posts-default");

    console.log("Connected to DB ✅");

    const result = await collectionPosts.insertMany(defaultPosts);

    console.log("Inserted successfully ✅", result);
    // await client.close();
    process.exit(0);
  } catch (err) {
    console.error("Error inserting default posts:", err);
    process.exit(1);
  }
};

settingDefaultPosts();

// export default settingDefaultPosts;
