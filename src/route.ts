import { Request, Response, Router } from "express";
import { io } from ".";

export const router = Router();

router.route("/notifyUser").post(async (req: Request, res: Response) => {
  const { roomId, title, type, message, createdAt } = req.body;
  console.log("sending notification through sockets");
  io.to(roomId).emit("notification", {
    title,
    type,
    message,
    createdAt,
  });
});
