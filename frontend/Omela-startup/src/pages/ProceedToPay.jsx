import React from 'react'
import { useAuthStore } from '../store/userAuthStore.js';
import axiosInstance from '../lib/axios.js';
import {loadRazorpay} from "razorpay";
import { useNavigate } from 'react-router-dom';

const proceedToPay = () => {
  const {setPaymentDone,token,setOrderId}=useAuthStore();
  const navigate = useNavigate();


  const handlePayment=async()=>{
    if(!token ){
      alert("Submit MPIN first!");
      return;
    }
    try {
      const res=await axiosInstance.post("/user_auth/process-payment",{token});
      setOrderId(res.data.orderId)
      const razorpay =await loadRazorpay();
      const options = {
        key:'rzp_test_3MdHSwOd1ystAO',
        amount:50000,
        currency:'INR',
        order_id:res.data.orderId,
        handler:function (response){
          setPaymentDone(true);
          alert("Payment successful! Now scan the QR code");
          navigate('/QRScanner');
        },      
      }
      const rzp=new razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed");
    }

  }
  return (
    <div>
      <button  onClick={handlePayment}>Proceed to pay</button>

    </div>
  )
}

export default proceedToPay;

