import { FoodModel } from "../Models/food.models.js"; 
import {asyncHandler} from "../Utils/asyncHandlers.js";
import {ApiErrors} from '../Utils/Apierrors.js';
import {ApiResponce} from '../Utils/Apiresponce.js';
import fs from 'fs';
import { uploadOnCloudinary,deleteFromCloudinary } from "../Utils/Cloudinary.js";


const deleteImageFromCloudinary = async (imageLink)=>{
    const splitArr = imageLink.split('/');
    // console.log(splitArr[splitArr.length-1].split('.')[0]);
    const imageName = splitArr[splitArr.length-1].split('.')[0];
    const resDel = await deleteFromCloudinary(imageName);
    if(!resDel) throw new ApiErrors(500,"File not deleted from cloudinary.");

    return resDel;
}


const addFood = asyncHandler(async (req,res)=>{

    try {
        // console.log("Req is :",req);
        // console.log("Req files is: ",req.file);
    
        // 1. Get the fileName added by the multer in the "req" object;
        let path = req.file?.path;
        if(!path) {
            throw new ApiErrors(400,"File Name is required.");
        }
    
    
        // 2. Get the details added by the users:
        const {name,description,price,category} = req.body;
        if(!name || !description || !price || !category) throw new ApiErrors(400,"Please enter all the details.");
        

        const CloudinaryRes = await uploadOnCloudinary(path);
        if(!CloudinaryRes) throw new ApiErrors(400,"Incorrect path.");


    
        // 3. Create a new document and added in the foodModel:
        const newFoodSchema = await FoodModel.create({
            name,description,price,category,
            image:CloudinaryRes.url
        })
    
    
        // 4. Checking if the document is successfully created or not:
        const createdUser = await FoodModel.findById(newFoodSchema._id)
        // console.log("Checking: ",createdUser);
        if(!createdUser) throw new ApiErrors(500,"Something went wrong while storing in the database.");
    
    
        // 5. Sending the response to the user:
        return res.status(201)
        .json(
            new ApiResponce(200,{},"Data Store Successfully.")
        )
    } catch (error) {
        console.log("Error is:",error);
        return res.status(400)
        .json(
            new ApiResponce(400,{},"Please send the valid fields.",error)
        )
    }

})

const listFoodData = asyncHandler(async (req,res)=>{

    const foodData = await FoodModel.find({});
    // console.log("FoodData is: ",foodData);


    return res.status(200)
    .json(
        new ApiResponce(201,
        {
            lists:foodData
        },
        "Food Data Sent successfully")
    )
})


const removeItem = asyncHandler(async (req,res)=>{

    if(!(req.body?.id)) throw new ApiErrors(400,"Please enter the food item id.");


    const foodItem = await FoodModel.findById(req.body?.id);
    if(!foodItem) throw new ApiErrors(400,"Please enter the valid _id.");


    const imageUrl = foodItem.image;


    // fs.unlink(`./public/${foodItem.image}`,()=>{});


    const DelRes = await FoodModel.deleteOne({_id:foodItem._id});
    // console.log(DelRes);

    const delres = await deleteImageFromCloudinary(imageUrl);
    if(!delres) throw new ApiErrors(500,"Something went wrong while delete image from cloudinary.");


    return res.status(200)
    .json(
        new ApiResponce(201,{},"Food Item delete successfully.")
    )


})



export {addFood,listFoodData,removeItem};