import React, { useContext, useState } from "react";
import "./Fooditem.css";
import { assets } from "../../assets/assets";
import { DataStorage } from "../../Store/storeContext";
import { toast } from "react-toastify";

function Fooditem({ item, setLogin }) {
  let id = item._id;
  // const [itemCount, setItemCount] = useState(0);
  const { cartCount, addToCart, deleteToCart } = useContext(DataStorage);

  return (
    <div className="foodItem">
      <div className="foodItemImageContainer">
        <img src={item.image} alt="image" className="foodImage" />

        {/* Conditional Rendring of the add buttons: */}
        {!cartCount[id] ? (
          <img
            className="add"
            onClick={() => {
              if (!localStorage.getItem("token")) {
                toast.error("Please Register or Login.");
                // setLogin(true);
              } else addToCart(id);
            }}
            src={assets.add_icon_white}
            alt="addicon"
          />
        ) : (
          <div className="foodItemCounter">
            <img
              onClick={() => deleteToCart(id)}
              src={assets.remove_icon_red}
              alt="deleteIcon"
            />
            <p>{cartCount[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="addIcon"
            />
          </div>
        )}
      </div>

      <div className="foodItemInfo">
        <div className="foodItemName">
          <p>{item.name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>

        <p className="foodItemDescription">{item.description}</p>
        <p className="foodItemPrice">₹{item.price}</p>
      </div>
    </div>
  );
}

export default Fooditem;
