import jwt from "jsonwebtoken";
import process from "process";

export const createToken = (user) => {
  return jwt.sign(
    {id: user.id,},
    process.env.JWT_Secret
  );
};

export const verifyToken = (token) => {
  jwt.verify(token);
};

