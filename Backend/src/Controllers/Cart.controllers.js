import { User } from "../Models/user.models.js";
import {asyncHandler} from "../Utils/asyncHandlers.js"
import {ApiResponce} from "../Utils/Apiresponce.js";



// Add to cart Controller:
const addToCart = asyncHandler(async (req,res)=>{
    try {
        let user = await User.findById(req.body.userId);
        let cartData = await user.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await User.findByIdAndUpdate(req.body.userId,{cartData});

        return res.status(200).json(new ApiResponce(201,{},"Data Added in the cart."));
        
    } catch (error) {
        return res.status(400).json(new ApiResponce(400,{},"Data Not Added in the cart."));
    }
});

// Delete From Cart:
const deleteFromCart = asyncHandler(async (req,res)=>{
    try {
        let user = await User.findById(req.body.userId);
        let cartData = await user.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }

        await User.findByIdAndUpdate(req.body.userId,{cartData});

        return res.status(200).json(new ApiResponce(201,{},"Data Deleted from the cart."));
        
    } catch (error) {
        return res.status(400).json(new ApiResponce(400,{},"Data Not Added in the cart."));
    }
});

// fetch data from cart:
const getCart = asyncHandler(async (req,res)=>{
    try {
        let user = await User.findById(req.body.userId);
        let cartData = await user.cartData;

        return res.status(200).json(new ApiResponce(201,{cartData},"Data fetched from the cart successfully."));
        
    } catch (error) {
        return res.status(400).json(new ApiResponce(400,{},"Data Not fetched from the cart successfully."));
    }
});

export {addToCart,deleteFromCart,getCart};