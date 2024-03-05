import express from "express";
import UserController from "../controllers/user_controller_class";
import { validateToken } from "../../../middlewares/auth/checkTokenExpiry ";


const user_router=express.Router();




user_router.post("/api/auth/register",UserController.registerUserController);
user_router.post("/api/auth/login",UserController.loginUserController);
user_router.post("/home",validateToken,UserController.home);


export default user_router;