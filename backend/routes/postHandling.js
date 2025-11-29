import connectDB from "../config/db.js";

const postHandling = async (category) => {
  try {
    const db = await connectDB();
    const collectionPosts = db.collection("posts");
    let posts = await collectionPosts.find({ category: category }).toArray();
    return {
      status: 200,
      data: posts,
      message: "Posts Successfully Loaded",
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "Server Error.",
    };
  }
};

export default postHandling;
