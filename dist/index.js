"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const route_1 = require("./route");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use("/api", route_1.router);
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        credentials: true,
    },
});
exports.io.on("connection", (socket) => {
    console.log("a user connected");
    const userInfo = socket.handshake.query;
    console.log(userInfo);
    if (userInfo.id) {
        //for emiting to specific user user it's userId as room and make its socket join the room with name as of its userId
        socket.join(userInfo.id);
        //for brodcasting about some events to all.
        socket.join("all");
        console.log("user joined a room 👀.");
    }
    socket.on("close", () => {
        console.log("closing the connect.");
        socket.disconnect();
    });
});
server.listen(process.env.PORT || 8000, () => {
    console.log("server running on port 8000 ⚡️.");
});
