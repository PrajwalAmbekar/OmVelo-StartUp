import React from 'react'
import { useAuthStore } from '../store/userAuthStore.js';
import axiosInstance from '../lib/axios.js';
import { useNavigate } from 'react-router-dom';

const MPINform = () => {

  const {mpin,setMpin,setToken}=useAuthStore();
  const navigate = useNavigate();


  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const res=await axiosInstance.post("/user_auth/generate-token",{mpin});
      setToken(res.data.token);
      console.log("Token received from backend:", res.data.token);
      alert("MPIN submitted! Now proceed to payment.");
      navigate('/ProceedToPay');
    } catch (error) {
      alert("error in generating token")
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="password"placeholder='Enter MPIN' value={mpin} onChange={(e)=>setMpin(e.target.value)} required />
      <button type='submit'>Submit MPIN</button>
    </form>
    </>
  )
}

export default MPINform;

