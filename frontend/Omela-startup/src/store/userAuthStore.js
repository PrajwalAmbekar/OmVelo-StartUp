import {create} from "zustand";

export const useAuthStore =create((set)=>({
    mpin:"",
    token:"",
    paymentDone:false,
    qrScanned:false,
    orderId:"",
    setMpin :(mpin)=>set({mpin}),
    setToken: (token)=>({token}),
    setPaymentDone:(statusbar)=>set({paymentDone:statusbar}),
    setQrScanned:(statusbar)=>set({qrScanned:statusbar}),
    setOrderId:(orderId)=>set({orderId}),

}));
