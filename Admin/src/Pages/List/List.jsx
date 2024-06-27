import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../Assets/assets";

function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/v1/listData");
      // console.log(response.data.data.lists);
      setList(response.data.data.lists);
      // toast.success("Data Fetch Successfully.");
      // console.log(list);
    })();
  }, []);

  const deleteItem = async (deleteId) => {
    // console.log(deleteId);
    const response = await axios.post("/api/v1/deleteItem", { id: deleteId });
    console.log(response.data);
    if (response?.data?.success) {
      toast.success(response.data.message);
      const res = await axios.get("api/v1/listData");
      setList(res.data.data.lists);
    } else toast.error("Something went wrong while deleting.");
  };

  return (
    <div className="list add flex-col">
      <p>All Foods Lists:</p>
      <div className="listTable">
        <div className="listTableFormat title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length == 0 ? (
          <p className="emptyMessage">No Items to display</p>
        ) : (
          list.map((elem, ind) => {
            return (
              <div key={ind} className="listTableFormat">
                <img src={`${elem.image}`} alt="FoodImage" />
                <p>{elem.name}</p>
                <p>{elem.category}</p>
                <p>₹{elem.price}</p>
                <p onClick={() => deleteItem(elem._id)} className="crossItem">
                  X
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default List;
