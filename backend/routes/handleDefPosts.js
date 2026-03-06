import connectDB from "../config/db.js";

export const defaultPostsHandling = async (category) => {
  // ! here I need to cache into Redis then use for
  // ! each request(avoiding fetching every time from DB)
  try {
    let db = await connectDB();
    const collectionPostsDefault = db.collection("posts-default");
    let posts = await collectionPostsDefault
      .find({ category: category })
      .toArray();

    return {
      status: 200,
      data: posts,
      message: "Posts Successfully loaded",
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "Server Error!",
    };
  }
};
