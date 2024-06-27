import {Router} from "express";
import { placeOrder,OrderPayment,verifyOrder,userOrder,getAllOrders,updateStatus } from "../Controllers/Order.controllers.js";
import authMiddleware from "../Middlewares/Auth.middleware.js";

const orderRouter = Router();

orderRouter.route("/placeOrder").post(authMiddleware,placeOrder);
orderRouter.route("/OrderPayment").post(OrderPayment);
orderRouter.route("/verifyOrder").post(verifyOrder);
orderRouter.route("/userOrder").get(authMiddleware,userOrder);
orderRouter.route("/getAllOrders").get(getAllOrders);
orderRouter.route("/updateStatus").post(updateStatus);


export default orderRouter;