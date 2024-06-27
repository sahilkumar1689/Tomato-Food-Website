import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandlers.js";
import { ApiErrors } from "../Utils/Apierrors.js";
import { ApiResponce } from "../Utils/Apiresponce.js";
import dotenv from 'dotenv';
dotenv.config({path:"./.env"});



const authMiddleware = asyncHandler(async (req,res,next)=>{
    const gettoken = req.headers["token"];
    // console.log(gettoken);

    if(!gettoken) return res.status(400).json(new ApiResponce(400,{},"User is not Authenticated."));

    try {
        const tokenDecode = jwt.verify(gettoken,process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json(new ApiResponce(400,{error},"Somthing Went Wrong."));
    }
})

export default authMiddleware;