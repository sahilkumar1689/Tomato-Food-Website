import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();


// Cores Configuration Settings:
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

// Important Middlewares:
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());



// End Points Middleware:
import foodRouter from "./Routers/food.routers.js";
import userRouter from "./Routers/User.routers.js";
import cartRouter from "./Routers/Cart.router.js";  
import orderRouter from "./Routers/Order.router.js";



// Route to add,delete,retrieve the food data:
app.use("/api/v1",foodRouter);


// Route to register,login the user:
app.use("/api/v2",userRouter);


// Route to add,get,delete from the cart:
app.use("/api/v3",cartRouter);


// Route to place Order:
app.use("/api/v4",orderRouter);



export default app;