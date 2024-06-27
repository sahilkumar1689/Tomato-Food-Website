import React, { useState } from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import Menu from "../../Components/Menu/Menu";
import Fooddisplay from "../../Components/Fooddisplay/Fooddisplay";
import AppDownload from "../../Components/AppDownload/AppDownload";

const Home = ({ setLogin }) => {
  return (
    <div className="homeContainer">
      <Header />
      <Menu />
      <Fooddisplay setLogin={setLogin} />
      <AppDownload />
    </div>
  );
};

export default Home;
