// import settingDefaultPosts from "../seeders/posts-default.js";
import connectDB from "../config/db.js";

export const postsHandling = async (category) => {
  try {
    let db = await connectDB();

    const collection = db.collection("posts-default");

    let posts = await collection.find({category:category}).toArray()

    return {
      status:200,
      data: posts,
      message:"Posts Successfully laoded"
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "Server Error!",
    }
  }
};

// postsHandling()