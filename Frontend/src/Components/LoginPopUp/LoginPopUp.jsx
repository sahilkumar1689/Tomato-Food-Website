import React, { useContext, useEffect, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { DataStorage } from "../../Store/storeContext";
import { toast } from "react-toastify";

function LoginPopUp({ setLogin }) {
  const { tkn, setTkn, setCartCount } = useContext(DataStorage);
  const [currState, setCurrState] = useState("SignUp");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const OnchangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    let response;

    if (currState == "SignUp") {
      response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v2/register`,
        userData
      );
    } else {
      response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v2/login`,
        userData
      );
    }

    if (response.data.success) {
      // console.log(typeof response.data.data.token);
      localStorage.setItem("token", response.data.data.token);
      setLogin(false);
      setTkn(localStorage.getItem("token"));
      // console.log(tkn);

      // Fetch cart data from the database:
      let curTkn = localStorage.getItem("token");
      (async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v3/getCart`,
          {
            headers: { token: curTkn },
          }
        );
        // console.log(response.data.data.cartData);
        setCartCount(response.data.data.cartData);
      })();

      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <div className="loginContainer">
        <form className="login-popup-container" onSubmit={submitData}>
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img
              src={assets.cross_icon}
              alt="crossIcons"
              onClick={() => setLogin(false)}
            />
          </div>
          <div className="login-popup-input">
            {currState === "Login" ? (
              <></>
            ) : (
              <input
                name="name"
                onChange={OnchangeHandler}
                value={userData.name}
                type="text"
                placeholder="Your Name"
                required
              />
            )}
            <input
              name="email"
              onChange={OnchangeHandler}
              value={userData.email}
              type="email"
              placeholder="Your Email"
              required
            />
            <input
              name="password"
              onChange={OnchangeHandler}
              value={userData.password}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">
            {currState === "SignUp" ? "Create Account" : "Login"}
          </button>
          <div className="login-popup-conditions">
            <input type="checkbox" required />
            <p>By continuing, i agree to the term of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("SignUp")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Click here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default LoginPopUp;
