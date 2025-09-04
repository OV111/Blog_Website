import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import process from "process";
import cookie from "cookie";
// import {bcrypt} from "bcrypt"
import { signUp, login, deleteAccount } from "./controllers/authController.js";
import { json } from "stream/consumers";

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // const cookies = cookie.parse(req.headers.cookie || "");
  // console.log("Incoming cookies ", cookies);

  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        if (req.url === "/accept-cookies") {
          if (data.accepted) {
            const serialized = cookie.serialize("cookiesAccepted", "true", {
              httpOnly: false,
              maxAge: 60 * 60 * 24 * 365,
              path: "/",
            });
            res.setHeader("Set-Cookie", serialized);
            res.writeHead(200, { "content-type": "application/json" });
            return res.end(
              JSON.stringify({ message: "Cookies Accepted", code: 200 })
            );
          }
        } else if (req.url === "/get-started") {
          const result = await signUp(data);

          if (result.status === 409) {
            res.writeHead(result.status, {
              "content-type": "application/json",
            });
            return res.end(JSON.stringify(result));
          }

          res.writeHead(result.status, { "content-type": "application/json" });
          return res.end(JSON.stringify(result));
        } else if (req.url === "/login") {
          const result = await login(data);
          // console.log(result);
          if (result.status === 200) {
            const serialized = cookie.serialize("session", result.userId, {
              httpOnly: true,
              secure: false,
              sameSite: "strict",
              maxAge: 60 * 60,
              path: "/",
            });
            res.setHeader("Set-Cookie", serialized);
          }

          res.writeHead(result.status, { "content-type": "application/json" });
          return res.end(JSON.stringify(result));
        } else {
          res.writeHead(404, { "content-type": "application/json" });
          return res.end(JSON.stringify({ message: "Not Found!" }));
        }
      } catch (err) {
        res.writeHead(500, { "content-type": "application/json" });
        return res.end(
          JSON.stringify({
            message: "Server Error.",
            code: 500,
            error: err.message,
          })
        );
      }
    });
  } else if (req.method === "DELETE" && req.url === "/log-out") {
    try {
      const serialized = cookie.serialize("session", "", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      });
      res.setHeader("Set-Cookie", serialized);
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Logged out succesfully", code: 200 })
      );
    } catch (err) {
      res.writeHead(500, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "Logout Error",
          code: 500,
          error: err.message,
        })
      );
    }
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "Not Found", code: 404 }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
