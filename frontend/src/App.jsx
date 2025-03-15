import React from 'react'
import { Route ,Routes } from 'react-router-dom'; 
import MPINform from './pages/MPINform.jsx';
import ProceedToPay from './pages/proceedToPay.jsx';
import QRScanner from './pages/QRScanner.jsx';
import VerifyMPIN from './pages/verifyMPIN.jsx';
import UnlockProduct from './pages/unlockProduct.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/MPINform' element={<MPINform/>}/>
        <Route path='/ProceedToPay' element={<ProceedToPay/>} />;
        <Route path='/QRScanner' element={<QRScanner/>} />;
        <Route  path='/VerifyMPIN' element={<VerifyMPIN/>} />;
        <Route path='/unlockProduct' element={ <UnlockProduct/> } />
      </Routes>
    </div>
  )
}

export default App;