import React from 'react'
import { useAuthStore } from '../store/userAuthStore.js';

const unlockProduct = () => {
  const { token, qrScanned } = useAuthStore();

  const handleUnlock = async () => {
    if (!qrScanned) {
      alert('Complete QR scan & MPIN verification first!');
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/unlock`, { token });
      alert(res.data.message);
    } catch (err) {
      alert('Failed to unlock bicycle');
    }
  };

  return <button onClick={handleUnlock}>Unlock Bicycle</button>;
}

export default unlockProduct;