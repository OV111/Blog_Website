import http from "http"
const PORT = 5000;

const server = http.createServer((req,res) => {
    res.end("some")
})
server.listen(PORT,()=> {
    console.log(`Server is Running at ${PORT}`)
})