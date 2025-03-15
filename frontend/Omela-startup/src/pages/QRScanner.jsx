import React, { useState } from 'react'
import { Scanner } from "@yudiel/react-qr-scanner";
import { useAuthStore } from '../store/userAuthStore.js';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const { setQrScanned, paymentDone } = useAuthStore();
  const [scannedData, setScannedData] = useState('');
  const [showScanner,setShowScanner]=useState(false);
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (!paymentDone) {
      alert('Complete payment first!');
      return;
    }
    if (data) {
      setScannedData(data);
      setQrScanned(true);
      alert('QR Code scanned! Now enter MPIN again for verification.');
      navigate('/VerifyMPIN'); 
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      <button onClick={() => setShowScanner(!showScanner)}>
        {showScanner ? "Hide Scanner" : 'Scan QR Code'}
      </button>
      {showScanner && (
        <div style={{ width: '250px', height: '250px', overflow: 'hidden', borderRadius: '10px' }}>
          <Scanner delay={300} onError={handleError} onResult={handleScan} style={{ width: '100%', height: '100%' }} />
        </div>
      )}
      <p>Scanned Data: {scannedData}</p>
    </div>
  );
};


export default QRScanner;
