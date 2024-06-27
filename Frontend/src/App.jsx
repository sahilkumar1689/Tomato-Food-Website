import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Placeorder from "./Pages/Placeorder/Placeorder";
import StoreProvider from "./Store/storeContext";
import Footer from "./Components/Footer/Footer";
import SearchItem from "./Components/SearchItem/SearchItem";
import { useState } from "react";
import LoginPopUp from "./Components/LoginPopUp/LoginPopUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "./Pages/Payment/Payment";
import Verify from "./Pages/Verify/Verify";
import MyOrder from "./Pages/MyOrder/MyOrder";

function App() {
  // Create state to handle the seacrh component:
  const [showSearch, setShowSearch] = useState(0);
  // Create state to handle the Login popup component:
  const [showlogin, setLogin] = useState(false);

  return (
    <>
      <StoreProvider>
        {showlogin ? <LoginPopUp setLogin={setLogin} /> : null}
        {showSearch === 1 ? (
          <div className="temp">
            <SearchItem setShowSearch={setShowSearch} />
          </div>
        ) : null}

        <div className="app">
          <ToastContainer />
          <Navbar setShowSearch={setShowSearch} setLogin={setLogin} />

          <Routes>
            <Route path="/" element={<Home setLogin={setLogin} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Placeorder />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
        <Footer />
      </StoreProvider>
    </>
  );
}

export default App;
