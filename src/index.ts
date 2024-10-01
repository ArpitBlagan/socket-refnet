import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server, Socket } from "socket.io";
import { router } from "./route";
dotenv.config();
const app = express();

app.use("/api", router);

const server = http.createServer(app);

interface CustomSocket extends Socket {
  userId?: string;
}

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});
io.on("connection", (socket: CustomSocket) => {
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
