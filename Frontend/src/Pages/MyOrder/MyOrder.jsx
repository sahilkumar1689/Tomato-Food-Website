import React, { useEffect, useState } from "react";
import "./MyOrder.css";
import axios from "axios";
import { useContext } from "react";
import { DataStorage } from "../../Store/storeContext";
import { assets } from "../../assets/assets";

function MyOrder() {
  const { tkn } = useContext(DataStorage);
  const [allOrder, setAllOrder] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get("/api/v4/userOrder", {
      headers: { token: tkn },
    });
    // console.log("before");
    // console.log(response.data.data);
    // console.log("After");
    setAllOrder(response.data.data);
  };

  useEffect(() => {
    if (tkn) fetchOrders();
  }, []);

  return (
    <div className="orderContainers">
      <h2>My Orders</h2>
      <div className="container">
        {allOrder.length == 0 ? (
          <h2 className="noOrderMessage">No Orders To Display.</h2>
        ) : (
          allOrder.map((elem, ind) => {
            return (
              <div key={ind} className="myOrder">
                <img src={assets.parcel_icon} alt="parcelIcon" />
                <p>
                  {elem.items.map((item, index) => {
                    if (index === elem.items.length - 1) {
                      return item.name + "x" + item.quantity;
                    } else {
                      return item.name + "x" + item.quantity + ",";
                    }
                  })}
                </p>
                <p>₹{elem.amount}</p>
                <p>Items:{elem.items.length}</p>
                <p>
                  <span>&#x25cf;</span>
                  <b>{elem.status}</b>
                </p>
                <button onClick={async () => await fetchOrders()}>
                  Track Order
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MyOrder;
