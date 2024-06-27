import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Order from "./Pages/Orders/Order";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const [showApp, setShowApp] = useState(true);

  return (
    <>
      <div className="AppContainer">
        <ToastContainer />
        <Navbar />
        <hr />
        <div className="appContent">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
