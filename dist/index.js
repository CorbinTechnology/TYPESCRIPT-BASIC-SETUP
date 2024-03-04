"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const database_1 = require("./config/database");
const user_routes_1 = __importDefault(require("./modules/auth/router/user_routes"));
// import { initializeSendgrid } from "./config/mail";
dotenv_1.default.config();
const port = process.env.PORT || 8001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(user_routes_1.default);
const server = http_1.default.createServer(app);
(0, database_1.initializeMongo)();
// initializeMongo();
// initializeSendgrid();
server.listen(port, () => {
    console.log(`server running on port ${port} and url http://localhost:${port}/`);
});