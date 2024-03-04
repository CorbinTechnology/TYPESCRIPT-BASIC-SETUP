import express from "express";
import UserController from "../controllers/user_controller_class";


const user_router=express.Router();




user_router.post("/api/auth/register",UserController.registerUser);
// user_router.post("/api/auth/login",loginUser);


export default user_router;