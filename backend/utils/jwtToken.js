import jwt from "jsonwebtoken";
import process from "process";

export const createToken = (user) => {
  return jwt.sign(
    {id: user.id,},
    process.env.JWT_Secret
  );
};

export const verifyToken = (token) => {
  try {
   return jwt.verify(token,process.env.JWT_Secret)
  } catch(err) { 
    console.log(err)
    return null;
  }
};