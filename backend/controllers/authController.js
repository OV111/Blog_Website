// import bcrypt from "bcrypt"
import connectDB from "../db.js";

// Sign Up
const signUp = async (data) => {
  let db = await connectDB();
  const { firstName, lastName, email, password, confirmPassword } = data;
  const users = db.collection("users"); //initial Line's
  const result = await users.insertOne({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });
  return {
    status: 201,
    message: "Account created Successfully!",
    userId: result.insertedId,
  };
};

// Login
const login = async (data) => {
  let db = await connectDB();
  const { email, password } = data;
  const users = db.collection("users");
  const user = await users.findOne({ email });
  if (!user) {
    return {
      status: 404,
      message: "User is not Found!",
    };
  }
  if (user.password !== password) {
    return {
      status: 401,
      message: "Password is incorrect.",
    };
  }
  return {
    status: 200,
    message: "Login Succesful.",
    userId: user._id,
  };
};

export { signUp, login };
