// import bcrypt from "bcrypt"
import connectDB from "../config/db.js";
import {createToken ,verifyToken } from "../utils/jwtToken.js"
// Sign Up
const signUp = async (data) => {
  try {
    let db = await connectDB();
    const { firstName, lastName, email, password, confirmPassword } = data;

    const users = db.collection("users"); //initial Line

    const existedUser = await users.findOne({ email });
    if (existedUser) {
      return { status: 409, message: "User with that Email already registered" };
    }
    const result = await users.insertOne({
      firstName,
      lastName,
      email,
      password,
      // confirmPassword,
    });
    const token = createToken({id: result.insertedId })

    return {
      status: 201,
      message: "Account created Successfully",
      token,
    };

  } catch (err) {
    console.error(err);
    return { code: 500, message: "Sign Up failed", error: err.message };
  }
};

// Login
const login = async (data) => {
  let db = await connectDB();
  const { email, password } = data;
  const users = db.collection("users");
  const user = await users.findOne({ email });

  // const decoded = verifyToken(localStorage.getItem("JWT"))
  // if !decoded return 403 forbidden 

  if (!user) {
    return {
      status: 404,
      message: "User is not Found!",
    };
  }
  if (user.password !== password) {
    return {
      status: 401,
      message: "Password is incorrect",
    };
  }
  // localStorage.setItem("user", user);
  const token = createToken({id: user._id})
  return {
    status: 200,
    message: "Login Successful",
    token,
    userId: user._id,
  };
};

const deleteAccount = async () => {};

export { signUp, login, deleteAccount };
