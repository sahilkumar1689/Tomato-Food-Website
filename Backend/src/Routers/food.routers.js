import {Router} from 'express';
import { addFood ,listFoodData,removeItem} from "../Controllers/food.controller.js";
import { upload } from '../Middlewares/multer.middleware.js';


const foodRouter = Router();


foodRouter.route("/add").post(upload.single("image"),addFood);

foodRouter.route("/listData").get(listFoodData);

foodRouter.route("/deleteItem").post(removeItem);


export default foodRouter;
