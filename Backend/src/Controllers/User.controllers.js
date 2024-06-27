import { User } from "../Models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import {asyncHandler} from "../Utils/asyncHandlers.js"
import {ApiErrors} from "../Utils/Apierrors.js";
import {ApiResponce} from "../Utils/Apiresponce.js";

import dotenv from 'dotenv';

dotenv.config({
    path:"./.env"
})


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Register User:
const registerUser = asyncHandler(async (req,res)=>{
    try {
        // 1. Fetch user Data:
        const {name,password,email} = req.body;
        if(!name || !password || !email) return res.json(new ApiErrors(400,"Please enter all the details"));

        // 2. Checking if user already exists:
        const existedUser = await User.findOne({email});
        if(existedUser) return res.json(new ApiErrors(400,"User Already Exists."));

        // 3. Validating the user email,password:

        if(!validator.isEmail(email)){
            return res,json(new ApiErrors(400,"Please enter the valid email."));
        }
        
        if(password.length<8) return res.json(new ApiErrors(400,"Please enter the strong password."));

        // 4. Encrypt the User Password:
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);

        // 5. Create the new user:

        const newUser = new User({
            name,email,password:hashPass
        })
        const user =  await newUser.save();


        // 6. Generate the jwt token:
        const token = createToken(user._id);
        console.log(token);

        return res.status(201).json(new ApiResponce(200,{token:token},"User Register Successfully."));

        
    } catch (error) {
        console.log(error);
        return res.json(new ApiErrors(400,"Something went wrong."));
    }
})


//Login User:
const loginUser = asyncHandler(async (req,res)=>{
    try {

        // 1. Fetch the data:
        const {email,password} = req.body;
        if(!email || !password) return res.json(new ApiResponce(401,{},"Please enter all the details."));


        // 2. Check the user is available or not:
        const existedUser = await User.findOne({email});
        if(!existedUser) return res.json(new ApiResponce(402,{},"User Not exists."));

        // 3. Check the password:
        const isMatch = await bcrypt.compare(password,existedUser.password);
        if(!isMatch) return res.json(new ApiResponce(403,{},"Please enter the valid Password."))

        // 4. Create token:
        const token = createToken(existedUser._id);

        return res.status(200).json(new ApiResponce(201,{token},"User Login Successfully"));

    } catch (error) {
        console.log(error);
        return res.json(new ApiResponce(400,{},"User Not Login Successfully"));
    }
})



export {loginUser,registerUser}