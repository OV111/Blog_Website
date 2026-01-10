import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import process from "process";
import cookie from "cookie";

import postHandling from "./routes/postHandling.js";
import { defaultPostsHandling } from "./routes/handleDefPosts.js";
// import { postsHandling } from "./routes/postHandling.js";
// import {bcrypt} from "bcrypt"
import { signUp, login, deleteAccount } from "./controllers/authController.js";
import { verifyToken } from "./utils/jwtToken.js";
import { ObjectId, ReturnDocument } from "mongodb";

dotenv.config();

const PORT = process.env.PORT || 5000;

let db;
// (async () => {
//   try {
//     db = await connectDB();
//   } catch (err) {
//     console.log("failed to connect", err);
//     process.exit(1);
//   }
// })();

const StartServer = async () => {
  try {
    db = await connectDB();

    const server = http.createServer(async (req, res) => {
      const maintenance = false;
      if (maintenance) {
        res.writeHead(503, { "content-type": "application/json" });
        return res.end("Server is under Maintenance");
      }

      // CORS Headers
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, OPTIONS, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
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

              // !console.log(result)
              if (result.status === 409) {
                res.writeHead(result.status, {
                  "content-type": "application/json",
                });
                return res.end(JSON.stringify(result));
              }

              res.writeHead(result.status, {
                "content-type": "application/json",
              });
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

              res.writeHead(result.status, {
                "content-type": "application/json",
              });
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

        // ! Initial Lines
      } else if (req.method === "GET" && req.url.startsWith("/categories/")) {
        try {
          const categoryName = req.url.split("/")[2];
          const isDefault = req.url.split("/")[3] === "default";
          console.log(isDefault);

          let result;
          if (isDefault) {
            result = await defaultPostsHandling(categoryName);
          } else {
            result = await postHandling(categoryName);
          }

          res.writeHead(result.status, {
            "content-type": "application/json",
          });
          return res.end(JSON.stringify(result.data));
          // ! here getting result from cache server not DB--(postsHandling will check that)
        } catch (err) {
          console.log(err);
          res.writeHead(500, { "content-type": "application/json" });
          return res.end(
            JSON.stringify({
              message: "Server Error!",
              code: 500,
            })
          );
        }
      }

      if (req.method === "POST" && req.url === "/blogs") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", async () => {
          const data = JSON.parse(body);
          const blogs = db.collection("blogs");

          const newBlog = {
            title: data.title,
            text: data.text,
            category: data.category,
            file: data.file,
          };
          const result = await blogs.insertOne(newBlog);

          console.log(result);
          res.writeHead(201, { "content-type": "application/json" });
          return res.end(
            JSON.stringify({ code: 201, message: "Created Blog" })
          );
        });
      } else if (req.url === "/log-out" && req.method === "DELETE") {
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
      } else if (req.url === "/my-profile" && req.method === "GET") {
        try {
          const token = req.headers.authorization?.replace("Bearer ", "");
          if (!token) {
            res.writeHead(403, { "content-type": "application/json" });
            return res.end(
              JSON.stringify({ message: "Forbidden: Invalid Token" })
            );
          }
          // 696229a232472b55252e3b5c
          const verified = verifyToken(token);
          const users = db.collection("users");
          const usersStats = db.collection("usersStats");

          const userId = new ObjectId(verified.id);

          const [user, stats] = await Promise.all([
            users.findOne({ _id: userId }),
            usersStats.findOne({ userId }),
          ]);
          // const user = await users.findOne({ _id: new ObjectId(verified.id) });
          // const stats = await usersStats.findOne({
          //   userId: new ObjectId(verified.id),
          // });

          if (!user) {
            res.writeHead(404, { "content-type": "application/json" });
            return res.end(JSON.stringify({ message: "User Not Found!" }));
          }

          await usersStats.updateOne(
            { userId },
            { $set: { lastActive: new Date() } }
          );
          const { password, ...userWithoutPassword } = user;

          res.writeHead(200, { "content-type": "application/json" });
          return res.end(JSON.stringify({ userWithoutPassword, stats }));
        } catch (err) {
          res.writeHead(500, { "content-type": "application/json" });
          return res.end(
            JSON.stringify({ message: "Server Error", error: err })
          );
        }
      } else if (req.url === "/my-profile" && req.method === "PUT") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", async () => {
          let parsedData = JSON.parse(body);
          const usersStats = db.collection("usersStats");
          const result = await usersStats.findOneAndUpdate(
            { userId: new ObjectId(parsedData.id) },
            { $set: { lastActive: parsedData.lastActive } }
          );
          res.writeHead(200, { "content-type": "application/json" });
          return res.end(JSON.stringify({ message: "stat", result }));
        });
      } else if (req.url === "/my-profile/settings" && req.method === "PUT") {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(JSON.stringify("Unauthorized: Invalid Token!"));
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", async () => {
          const verified = verifyToken(token);
          if (!verified) {
            res.writeHead(403, { "Content-Type": "application/json" });
            return res.end(JSON.stringify("Forbidden: Invalid Token"));
          }

          const data = JSON.parse(body);
          const users = db.collection("users");
          const usersStats = db.collection("usersStats");

          const updatedUser = await users.findOneAndUpdate(
            { _id: new ObjectId(verified.id) },
            { $set: { firstName: data.fname, lastName: data.lname } },
            { returnDocument: "after" }
          );

          const updatedStats = await usersStats.findOneAndUpdate(
            { userId: new ObjectId(verified.id) },
            {
              $set: {
                bio: data.bio || "",
                postsCount: data.postsCount || 0,
                profileImage: data.profileImage || "",
                bannerImage: data.bannerImage || "j",
                githubLink: data.githubLink || "",
                linkedinLink: data.linkedinLink || "",
                twitterLink: data.twitterLink || "",
                lastActive: new Date(),
              },
            },
            { returnDocument: "after" }
          );

          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              message: "Account Updated Successfully!",
              user: updatedUser,
              stats: updatedStats,
            })
          );
        });
      }
      //  else {
      //   res.writeHead(404, { "content-type": "application/json" });
      //   return res.end(JSON.stringify({ message: "Not Found", code: 404 }));
      // }
      // if(req.method === "GET" && req.url === "/about") {
      //   res.writeHead(200,{"content-type" : "text/plain"})
      //   res.end("VAhe")
      // }
    });
    server.listen(PORT, () => {
      console.log(`Server is Running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Failed to Connect!", err);
    process.exit(1);
  }
};

StartServer();
