import http from "http";
const PORT = 5000;
// import {bcrypt}
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "POST" && req.url === "/get-started") {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk
    });
    req.on("end", () => {
        const data = JSON.parse(body)
        console.log(data)
        res.writeHead(200,{"content-type":"application/json"})
        res.end(JSON.stringify({message:"Got it!",statusCode:200}))
    })
    return ;
  }
});

server.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
