import React, { useContext } from "react";
import "./Payment.css";
import { DataStorage } from "../../Store/storeContext";
import axios from "axios";

function Payment() {
  const { odrId, setOdrId } = useContext(DataStorage);

  const placePayment = async (choice) => {
    // console.log(choice);

    let response = await axios.post("/api/v4/OrderPayment", {
      isVerified: choice,
      orderId: odrId,
    });

    if (response.data.data.url) {
      window.location.replace(response.data.data.url);
    }
  };
  return (
    <div className="paymentContainer">
      <p>Are You Sure You want to Proceed With the payment?</p>
      <div className="paymentBtn">
        <button onClick={() => placePayment(true)}>Yes</button>
        <button onClick={() => placePayment(false)}>No</button>
      </div>
    </div>
  );
}

export default Payment;
