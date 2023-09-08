const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { 
    cors: {
        origin: "*",
        credentials: true
    }
});

const users = {}

io.on("connection", (socket) => {
    socket.on("send-message", message => {
        socket.broadcast.emit("chat-message", {message: message, name: users[socket.id]})
    })
    socket.on("new-user", name => {
        users[socket.id] = name
        socket.broadcast.emit("user-connected", name)
    })
    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnected", users[socket.id])
        delete users[socket.id]
    })
});

httpServer.listen(3000);