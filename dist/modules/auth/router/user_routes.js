"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user_controller");
const user_router = express_1.default.Router();
user_router.post("/api/auth/register", user_controller_1.registerUser);
exports.default = user_router;
