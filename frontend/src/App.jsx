import React from 'react'
import { Route ,Routes } from 'react-router-dom'; 
import MPINform from './pages/MPINform.jsx';
import ProceedToPay from './pages/ProceedToPay.jsx';
import QRScanner from './pages/QRScanner.jsx';
import VerifyMPIN from './pages/verifyMPIN.jsx';
import UnlockProduct from './pages/unlockProduct.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>;
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
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