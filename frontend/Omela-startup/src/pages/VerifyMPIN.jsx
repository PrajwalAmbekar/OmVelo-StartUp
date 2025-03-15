import React from 'react'
import { useAuthStore } from '../store/userAuthStore.js';
import { useNavigate } from 'react-router-dom';

const verifyMPIN = () => {
  const { mpin, setMpin, token, qrScanned } = useAuthStore();
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!qrScanned) {
      alert('Scan QR code first!');
      return;
    }
    try {
      const res = await axios.post('user_auth/verify-mpin', { token, mpin });
      alert(res.data.message);
      navigate('/unlockProduct');
    } catch (err) {
      alert('MPIN verification failed');
    }
  };

  return (
    <form onSubmit={handleVerification}>
      <input type='password' placeholder='Re-enter MPIN' value={mpin} onChange={(e) => setMpin(e.target.value)} required />
      <button type='submit'>Verify MPIN</button>
    </form>
  );
}

export default verifyMPIN;

