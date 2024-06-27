import React, { useContext } from "react";
import "./Cart.css";
import { DataStorage } from "../../Store/storeContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    cartCount,
    originalFoodList,
    deleteToCart,
    getCartAmountandCount,
    tkn,
  } = useContext(DataStorage);

  const navigate = useNavigate();

  return (
    <div className="cartContainer">
      <div className="cartItems">
        <div className="cartItemsTitle">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {originalFoodList.map((elem, index) => {
          if (cartCount[elem._id] > 0) {
            return (
              <>
                <div key={index} className="cartItemsTitle cartItemsItem">
                  <img src={elem.image} alt="image" />
                  <p>{elem.name}</p>
                  <p>₹{elem.price}</p>
                  <p>{cartCount[elem._id]}</p>
                  <p>₹{elem.price * cartCount[elem._id]}</p>
                  <p
                    className="cartItemCross"
                    onClick={() => deleteToCart(elem._id)}
                  >
                    X
                  </p>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>

      <div className="cartBottom">
        <div className="cartTotal">
          <h2>Cart Total</h2>
          <div className="totalContainer">
            <div className="cardTotalDetails">
              <p>Subtotal</p>
              <p>₹{getCartAmountandCount().amount}</p>
            </div>
            <hr />
            <div className="cardTotalDetails">
              <p>Delivery Fee</p>
              <p>₹{2}</p>
            </div>
            <hr />
            <div className="cardTotalDetails">
              <p>Total</p>
              <p>₹{getCartAmountandCount().amount + 2}</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (getCartAmountandCount().amount == 0) {
                navigate("/cart");
                toast.error("Your Cart is empty.");
              } else navigate("/order");
            }}
          >
            Proceed To Checkout
          </button>
        </div>

        <div className="cartPromocode">
          <div className="">
            <p>If you have any promo code, Enter it here.</p>
            <div className="PromocodeInput">
              <input type="text" placeholder="promo Code" required />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
