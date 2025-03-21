import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
export const useAuthStore = create((set) => ({
    mpin: '',
    token: '',
    paymentDone: false,
    qrScanned: false,
    amount: 0,
    authUser: null,
    isSignUp: false,
    isLoggingIn: false,
    signup: async (data) => {
        set({ isSignUp: true });
    
        try {
            console.log("Sending signup data:", data); // Debugging line
    
            const res = await axiosInstance.post("/auth/signup", data, {
                headers: { "Content-Type": "application/json" }
            });
    
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            console.log("Signup error:", error.response?.data || error.message); // Debugging line
            const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            set({ isSignUp: false });
        }
    },
    
    
    login: async (data) => {
        set({ isLoggingIn: true });
    
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
            toast.error(errorMessage);
        }
    },
    setMpin: (mpin) => set(() => ({ mpin })),
    setToken: (token) => set(() => ({ token })),
    setPaymentDone: (status) => set(() => ({ paymentDone: status })),
    setQrScanned: (status) => set(() => ({ qrScanned: status })),
    setAmount: (amount) => set(() => ({ amount })),
}));

