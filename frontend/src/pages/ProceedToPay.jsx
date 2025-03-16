import React, { useEffect } from "react";
import axiosInstance from "../lib/axios.js";
import { useAuthStore } from "../store/userAuthStore.js";
import { useNavigate } from "react-router-dom";

const ProceedToPay = () => {
  const { token, setPaymentDone } = useAuthStore();
  const navigate = useNavigate();

  const plans = [
    { bicycle: "Standard", km: "8 km", amount:1 },
    { bicycle: "Premium", km: "20 km", amount: 500 },
    { bicycle: "Deluxe", km: "30+ km", amount: 700 },
  ];

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (amount) => {
    if (!token) {
      alert("Submit MPIN first!");
      return;
    }

    try {
   
      const res = await axiosInstance.post(
        "/user_auth/process-payment",
        { amount,token },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.data.orderId) {
        alert("Payment Failed!");
        return;
      }

      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        alert("Failed to load payment gateway. Try again.");
        return;
      }

      
      const options = {
        key: "rzp_test_MHOJoLGFOgygEq", 
        amount: amount * 100, 
        currency: "INR",
        order_id: res.data.orderId,
        handler: function (response) {
          setPaymentDone(true);
          alert("Payment Successful! Now scan the QR code.");
          navigate("/QRScanner");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      alert("Payment Failed! Check console for details.");
    }
  };

  return (
    <div>
      <h2>Select a Plan</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Bicycle</th>
            <th>Distance</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => (
            <tr key={index}>
              <td>{plan.bicycle}</td>
              <td>{plan.km}</td>
              <td>₹{plan.amount}</td>
              <td>
                <button onClick={() => handlePayment(plan.amount)}>Proceed to Pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProceedToPay;
