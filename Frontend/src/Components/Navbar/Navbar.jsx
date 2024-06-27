import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useState, memo, useContext, useEffect } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link, useNavigate } from "react-router-dom";
import { DataStorage } from "../../Store/storeContext";
import { toast } from "react-toastify";

function Navbar({ setShowSearch, setLogin }) {
  const [menuState, setMenuState] = useState("");
  const { getCartAmountandCount, tkn, setTkn } = useContext(DataStorage);

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setTkn("");
    window.location.reload();
    toast.success("User Logout Successfully.");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <Link to="/" style={{ border: "none", padding: "0px 0px" }}>
          <img src={assets.logo} alt="logo" className="logo" />
        </Link>

        <ul className="navbarMenu">
          <li
            className={menuState === "home" ? "active" : ""}
            onClick={() => {
              setMenuState("home");
            }}
          >
            Home
          </li>
          <li
            className={menuState === "menu" ? "active" : ""}
            onClick={() => {
              setMenuState("menu");
            }}
          >
            <AnchorLink
              href="#menuId"
              style={{ border: "none", padding: "0px 0px" }}
            >
              Menu
            </AnchorLink>
          </li>
          <li
            className={menuState === "mobile" ? "active" : ""}
            onClick={() => {
              setMenuState("mobile");
            }}
          >
            <AnchorLink
              href="#Download"
              style={{ border: "none", padding: "0px 0px" }}
            >
              Mobile-App
            </AnchorLink>
          </li>
          <li
            className={menuState === "contact" ? "active" : ""}
            onClick={() => {
              setMenuState("contact");
            }}
          >
            <AnchorLink
              href="#footerContact"
              style={{ border: "none", padding: "0px 0px" }}
            >
              Contact-Us
            </AnchorLink>
          </li>
        </ul>

        <div className="navbarRight">
          <img
            src={assets.search_icon}
            alt="searchIcons"
            onClick={() => setShowSearch(1)}
            className="searchImg"
          />
          <div className="navbarSearchIcons">
            <Link to="/cart" style={{ border: "none", padding: "0px 0px" }}>
              <img src={assets.basket_icon} alt="basketIcons" />
            </Link>
            <div className="dot">{getCartAmountandCount().count}</div>
          </div>

          {!tkn ? (
            <button onClick={() => setLogin(true)} className="signinBtn">
              Sign In
            </button>
          ) : (
            <div className="navBarProfile">
              <img src={assets.profile_icon} alt="profile" />
              <ul className="navProfileDropDown">
                <li onClick={() => navigate("/myOrder")}>
                  <img src={assets.bag_icon} alt="bagicon" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logOut}>
                  <img src={assets.logout_icon} alt="logoutIcon" />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default memo(Navbar);
