import app from './app.js';
import dotenv from 'dotenv';
import databaseConnection from './Database/DBconnection.js';


dotenv.config({path:"./.env"});

const port = process.env.PORT || 3000;



// Second Method and the most appropriate method to connect with the database:

databaseConnection()
.then(()=>{
    app.listen(port,()=>{
        console.log(`App start listening at port ${port}`);
    })
}).catch((error)=>{
    console.log(error);
})















//  First method to connect with the database inside the index.js file.
// import mongoose from 'mongoose';
// import DB_NAME from './constants.js';

// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("Error",error);
//             throw error;
//         })
//         app.listen(port,()=>{
//             console.log(`App starting listen at port ${port}`);
//         })
        
//     }
//     catch(error){
//         console.log(error);
//     }
// })();


