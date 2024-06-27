import React, { useContext, useState } from "react";
import "./Placeorder.css";
import { DataStorage } from "../../Store/storeContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Placeorder = () => {
  const { getCartAmountandCount, originalFoodList, cartCount, tkn, setOdrId } =
    useContext(DataStorage);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const setUserData = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(userInfo);

    // Create the items array:
    let orderItems = [];
    originalFoodList.map((elem, ind) => {
      if (cartCount[elem._id] > 0) {
        let singleOrder = elem;
        singleOrder["quantity"] = cartCount[elem._id];
        orderItems.push(singleOrder);
      }
    });

    // Create the order data object:
    let orderData = {
      items: orderItems,
      address: userInfo,
      amount: getCartAmountandCount().amount + 2,
    };

    // console.log(orderData);

    // Store the order in the database:
    let response = await axios.post("/api/v4/placeOrder", orderData, {
      headers: { token: tkn },
    });

    if (response.data.success) {
      setUserInfo({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
      });
      setOdrId(response.data.data.orderId);
      // console.log(response.data.data.orderId);
      navigate("/payment");
    } else {
      navigate("/");
      toast.error("Something went wrong while placed the order.Try Again!");
    }
  };

  return (
    <form className="placeOrder" onSubmit={onSubmitHandler}>
      <div className="placeOrderLeft">
        <p className="title">Delivery Information</p>
        <div className="multiField">
          <input
            onChange={setUserData}
            name="firstName"
            value={userInfo.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={setUserData}
            name="lastName"
            value={userInfo.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          onChange={setUserData}
          name="email"
          value={userInfo.email}
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          onChange={setUserData}
          name="street"
          value={userInfo.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multiField">
          <input
            onChange={setUserData}
            name="city"
            value={userInfo.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            onChange={setUserData}
            name="state"
            value={userInfo.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multiField">
          <input
            onChange={setUserData}
            name="zipCode"
            value={userInfo.zipCode}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            onChange={setUserData}
            name="country"
            value={userInfo.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          onChange={setUserData}
          name="phone"
          value={userInfo.phone}
          type="text"
          placeholder="Phone"
          required
        />
      </div>

      <div className="placeOrderRight">
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
          <button type="submit">Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
