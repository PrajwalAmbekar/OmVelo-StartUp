import {create} from "zustand";
export const useAuthStore = create((set) => ({
    mpin: '',
    token: '',
    paymentDone: false,
    qrScanned: false,
    setMpin: (mpin) => set(() => ({ mpin })), 
    setToken: (token) => set(() => ({ token })), 
    setPaymentDone: (status) => set(() => ({ paymentDone: status })),
    setQrScanned: (status) => set(() => ({ qrScanned: status })),
  }));
