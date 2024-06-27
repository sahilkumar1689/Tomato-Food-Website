import { assets } from "../../Assets/assets";
import "./Sidebar.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sideBar">
      <div className="sidebarOptions">
        <NavLink to={"/"} className="sidebarOption">
          <img src={assets.add_icon} alt="addIcon" />
          <p>Add</p>
        </NavLink>
        <NavLink to={"/list"} className="sidebarOption">
          <img src={assets.order_icon} alt="addIcon" />
          <p>List</p>
        </NavLink>
        <NavLink to={"/order"} className="sidebarOption">
          <img src={assets.order_icon} alt="addIcon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
