import {Router} from "express";
import { addToCart,deleteFromCart,getCart } from "../Controllers/Cart.controllers.js";
import authMiddleware from "../Middlewares/Auth.middleware.js"; 

const cartRouter = Router();

cartRouter.route("/getCart").get(authMiddleware,getCart);

cartRouter.route("/addToCart").post(authMiddleware,addToCart);

cartRouter.route("/deleteFromCart").post(authMiddleware,deleteFromCart);


export default cartRouter;