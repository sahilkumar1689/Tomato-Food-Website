import {Router} from "express";
import { loginUser,registerUser } from "../Controllers/User.controllers.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

export default userRouter;