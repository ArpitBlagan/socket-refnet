"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const _1 = require(".");
exports.router = (0, express_1.Router)();
exports.router.route("/notifyUser").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, title, type, message, createdAt } = req.body;
    console.log("sending notification through sockets");
    _1.io.to(roomId).emit("notification", {
        title,
        type,
        message,
        createdAt,
    });
}));
