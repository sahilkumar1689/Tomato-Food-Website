import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import {ApiErrors} from './Apierrors.js';
import fs from 'fs';

dotenv.config({path:"./.env"});


// console.log(process.env.CLOUDINARY_NAME)
// console.log(process.env.CLOUDINARY_API_KEY)
// console.log(process.env.CLOUDINARY_API_SECRET)
// console.log(process.env.PORT)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) {
            console.log(localFilePath);
            return null;
        }

        // upload the file on cloudinary:
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        // File upload successfull:
        // console.log("File is uploaded on cloudinary",response.url);
        fs.unlinkSync(localFilePath);
        return response;

    }
    catch(error){

        console.log("Error in cloudinary catch",error,localFilePath);
        fs.unlinkSync(localFilePath)  // remove the local saved temporary file as the upload operation got failed.
        return null;
    }
}

const deleteFromCloudinary = async (fileName)=>{
    try {
        if(!fileName) throw new ApiErrors(400,"Image name is required.");

        const DelRes = await cloudinary.uploader.destroy(fileName);

        return DelRes;
        
    } catch (error) {
        console.log("Error in cloudinary catch while deleting",error);
    }
}

export {uploadOnCloudinary,deleteFromCloudinary};