import React from "react";
import "./Order.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../Assets/assets";
import { toast } from "react-toastify";

function Order() {
  const [allOrder, setOrder] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v4/getAllOrders`
    );
    // console.log(response.data.data);
    setOrder(response.data.data);
    // console.log(allOrder);
  };

  const statusHandler = async (e, Id) => {
    // console.log(e.target.value, Id);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v4/updateStatus`,
      {
        orderId: Id,
        status: e.target.value,
      }
    );

    if (response.data.success) {
      toast.success("Status Update Successfully.");
      await fetchAllOrders();
    } else toast.error(response.data.message);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orderContainers add">
      <h3>OrderPage:</h3>
      <div className="orderList">
        {allOrder.length == 0 ? (
          <h2 className="emptyMessage">No order to display.</h2>
        ) : (
          allOrder.map((elem, ind) => {
            return (
              <div key={ind} className="orderItems">
                <img src={assets.parcel_icon} alt="parcel_icon" />
                <div className="container">
                  <p className="orderItemsFood">
                    {elem.items.map((item, index) => {
                      if (index === elem.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else return item.name + " x " + item.quantity + ",";
                    })}
                  </p>
                  <p className="orderItemName">
                    {elem.address.firstName + " " + elem.address.lastName}
                  </p>
                  <div className="orderItemAddress">
                    <p>{elem.address.street + ", "}</p>
                    <p>
                      {elem.address.city +
                        ", " +
                        elem.address.state +
                        ", " +
                        elem.address.country +
                        ", " +
                        elem.address.zipCode}
                    </p>
                  </div>
                  <p className="phoneNumber">{elem.address.phone}</p>
                </div>
                <p>Items: {elem.items.length}</p>
                <p>₹{elem.amount}</p>
                <select
                  onChange={(e) => statusHandler(e, elem._id)}
                  value={elem.status}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Order;
