import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { initializeMongo } from "./config/database";
import user_router from "./modules/auth/router/user_routes";

// import { initializeSendgrid } from "./config/mail";

dotenv.config();

const port = process.env.PORT || 8001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(user_router);

// const server = http.createServer(app);


initializeMongo();


// initializeSendgrid();

app.listen(port, () => {
  console.log(
    `server running on port ${port} and url http://localhost:${port}/`
  );
});