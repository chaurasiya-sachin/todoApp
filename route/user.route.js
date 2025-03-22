import { Router } from "express";
import userController from "../controller/user.controller.js"

const route = Router();

route.post("/signup",userController.signUp)
route.post("/login",userController.login)



export default route;