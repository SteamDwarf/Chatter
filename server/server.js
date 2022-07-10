const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = 5000;

app.use(cors());
server.listen(PORT, () => {
    console.log(`Server is started on http://localhost:${PORT}`);
});
io.on("connection", (socket) => {
    console.log("Connected to socket: ", socket.id);

    socket.on("disconnect", () => {
        console.log("Disconnected from socket: ", socket.id);
    });
});