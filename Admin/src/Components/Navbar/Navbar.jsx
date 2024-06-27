import React from "react";
import "./Navbar.css";
import { assets } from "../../Assets/assets";
import { memo } from "react";

function Navbar() {
  return (
    <div className="navBar">
      <img className="logo" src={assets.logo} alt="logo" />
      <img className="profile" src={assets.profile_image1} alt="profileImage" />
    </div>
  );
}

export default memo(Navbar);
