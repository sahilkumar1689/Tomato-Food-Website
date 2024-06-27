import React, { useContext } from "react";
import "./Fooddisplay.css";
import { DataStorage } from "../../Store/storeContext";
import Fooditem from "../FoodItem/Fooditem";

function Fooddisplay({ setLogin }) {
  let { originalFoodList } = useContext(DataStorage);
  //   console.log(food_lists);
  const { category } = useContext(DataStorage);

  return (
    <div className="food_Display_Container">
      <h2>Top dishes near you.</h2>

      <div className="foodItemsContainer">
        {originalFoodList.map((elem, index) => {
          if (category === "All" || elem.category === category) {
            return <Fooditem key={index} item={elem} setLogin={setLogin} />;
          }
        })}
      </div>
    </div>
  );
}

export default Fooddisplay;
