import React, { useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Verify() {
  const [searchParam, setSearchParam] = useSearchParams();
  const success = searchParam.get("success");
  const orderId = searchParam.get("orderId");
  console.log(success, orderId);

  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post("/api/v4/verifyOrder", {
      success,
      orderId,
    });

    if (response.data.success) {
      navigate("/myOrder");
      toast.success("Order Placed Successfully.");
    } else {
      navigate("/");
      toast.success("Order Cancel Successfully.");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verifiedContinaer">
      <div className="Spinner"></div>
    </div>
  );
}

export default Verify;
