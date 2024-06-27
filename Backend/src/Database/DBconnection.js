import mongoose from 'mongoose';
import DB_NAME from '../constants.js';




const databaseConnection = async ()=>{
    try {
        const getConenction = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`);
        // console.log(getConenction);
        console.log("DATABASE CONNECT SUCCESSFULLY.");
    } catch (error) {
        console.log("DATABASE FAILED TO CONNECT",error);
        process.exit(1);
    }
}

export default databaseConnection;