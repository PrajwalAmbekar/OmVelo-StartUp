import React, { useState, useRef } from 'react';
import { useAuthStore } from '../store/userAuthStore.js';
import axiosInstance from '../lib/axios.js';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const MPINform = () => {
  const { setMpin, setToken } = useAuthStore();
  const [mpinDigits, setMpinDigits] = useState(['', '', '', '']);
  const [showMpin, setShowMpin] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newMpin = [...mpinDigits];
    newMpin[index] = value;
    setMpinDigits(newMpin);
    setMpin(newMpin.join(''));
    
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !mpinDigits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mpin = mpinDigits.join('');
      const res = await axiosInstance.post("/user_auth/generate-token", { mpin });
      setToken(res.data.token);
      console.log("Token received from backend:", res.data.token);
      alert("MPIN submitted! Now proceed to payment.");
      navigate('/ProceedToPay');
    } catch (error) {
      alert("Error in generating token");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }} className='bg-[#A364FF] w-[28rem] p-6 h-56 rounded-3xl ' >
      <h className="text-3xl text-white ">MPIN</h>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
        {mpinDigits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type={showMpin ? "text" : "password"}
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            style={{ width: '40px', height: '40px', textAlign: 'center', fontSize: '20px', border: '2px solid #ccc', borderRadius: '5px', outline: 'none', background: '#CB80FF', caretColor: '#000',color: "#fff"}}
            className='mb-2 mt-2'
            required
          />
        ))}
        <button
          type="button"
          onClick={() => setShowMpin(!showMpin)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', marginLeft: '10px', color:"#fff" }}
        >
          {showMpin ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }} className='bg-[#853df1] shadow-md rounded-2xl text-white space-x-8 py-2'>Submit</button>
    </form>
  );
};

export default MPINform;
