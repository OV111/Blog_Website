import http from "http";
import dotenv from "dotenv";
import connectDB from "./db.js";
import process from "process";
// import {bcrypt} from "bcrypt"
import { signUp, login } from "./controllers/authController.js";
import { error, log } from "console";

dotenv.config();

const PORT = process.env.PORT || 5000;

let db;
(async () => {
  try {
    db = await connectDB();
  } catch (err) {
    console.log("failed to connect", err);
    process.exit(1);
  }
})();

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        if (req.url === "/get-started") {
          const result = await signUp(data);
          // console.log(result);

          res.writeHead(result.status, { "content-type": "application/json" });
          res.end(JSON.stringify(result));
        } else if (req.url === "/login") {
          const result = await login(data);
          // console.log(result);

          res.writeHead(result.status, { "content-type": "application/json" });
          res.end(JSON.stringify(result));
        }
      } catch (err) {
        res.writeHead(500, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Server Error.",
            code: 500,
            error: err.message,
          })
        );
      }
    });
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found", code: 404 }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});