import { Order } from "../Models/Order.models.js";
import {User} from "../Models/user.models.js";
import { ApiResponce } from "../Utils/Apiresponce.js";
import {asyncHandler} from "../Utils/asyncHandlers.js";


/*
Code to add stripe:

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

*/ 


const frontendUrl = "https://tomato-food-website-frontend.onrender.com/";


// Placing Order:
const placeOrder = asyncHandler(async (req,res)=>{
    try {

        // 1. Create new Object and store in the database.You can also use the create method():
        if(!req.body.items || !req.body.address || !req.body.amount) return res.json(new ApiResponce(401,{},"Item required"));

        const newOrder = new Order({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        let orderSchema = await newOrder.save();
        // console.log(orderSchema);

        // 2. Remove the cart amount:
        await User.findByIdAndUpdate(req.body.userId,{cartData:{}});


        // 3. Stripe Code:
        // const line_items = req.body.items?.map((elem,inde)=>({
        //     price_data:{
        //         currency:"inr",
        //         product_data:{name:elem.name},
        //         unit_amount:elem.price
        //     },
        //     quantity:elem.quantity
        // }))

        // line_items.push({
        //     price_data:{
        //         currency:"inr",
        //         product_data:{
        //             name:"Delivery Charges"
        //         },
        //         unit_amount:2
        //     },
        //     quantity:1
        // })

        // const session = await stripe.checkout.sessions.create({
        //     line_items,
        //     mode:"payment",
        //     success_url : `${frontendUrl}/verify?success=true&orderId=${orderSchema._id}`,
        //     cancel_url : `${frontendUrl}/verify?success=false&orderId=${orderSchema._id}`,
        // })


    // let success_url = `${frontendUrl}/verify?success=true&orderId=${orderSchema._id}`
    // let cancel_url = `${frontendUrl}/verify?success=false&orderId=${orderSchema._id}`

    return res.status(200).json(new ApiResponce(201,{orderId:orderSchema._id},"Order Store Successfully."))
    
    } catch (error) {
        return res.json(new ApiResponce(401,{},"Order Not Store Successfully."))
    }
})

const OrderPayment = asyncHandler(async (req,res)=>{
    try {
        let {isVerified,orderId} = req.body;
        
        let success_url = `${frontendUrl}/verify?success=true&orderId=${orderId}`
        let cancel_url = `${frontendUrl}/verify?success=false&orderId=${orderId}`
        if(isVerified){
            return res.json(new ApiResponce(201,{url:success_url},"Payment Succeed."));
        }
        else{
            return res.json(new ApiResponce(201,{url:cancel_url},"Payment Not Succeed."));
        }

    } catch (error) {
        return res.json(new ApiResponce(400,{},"Something went wrong."));
    }
})

const verifyOrder = asyncHandler(async (req,res)=>{
try {
    const {orderId,success} = req.body;
    if(success=="true"){
        await Order.findByIdAndUpdate(orderId,{payment:true});
        return res.json({success:true,message:"Paid"});
    }
    else{
        await Order.findByIdAndDelete(orderId);
        return res.json({success:false,message:"Not Paid"});
    }
} catch (error) {
    return res.json({success:false,message:"Error."});
}
})

const userOrder = asyncHandler(async (req,res)=>{
    try {
        const id = req.body.userId;

        const allOrders = await Order.find({userId:id});
        return res.json({success:true,data:allOrders});
        
    } catch (error) {
        return res.json({success:false,message:"error"});
    }
})

const getAllOrders = asyncHandler(async (req,res)=>{
    try {
        const allOrders = await Order.find({});
        return res.json({success:true,data:allOrders});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"});
    }
})


const updateStatus = asyncHandler(async (req,res)=>{
    try {
        if(!(req.body.status) || !(req.body.orderId)) return res.json({success:false,message:"Status is empty."});


        await Order.findByIdAndUpdate(req.body.orderId,{status:req.body.status});

        return res.json({success:true,message:"Updated"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Not Updated"});
    }
})
export {placeOrder,OrderPayment,verifyOrder,userOrder,getAllOrders,updateStatus};
