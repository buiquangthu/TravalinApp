import axiosClient from "./axiosClient";
import axios from "axios";

const authService = {
    login: async (data: { email: string, password: string }) => {
        const url = '/users/login';
        return await axiosClient.post(url, data);
        // const res = await axios.post(url, data);
        // console.log("Login successful: ", res.data);
        // return res;
    },

    register: async (data: { email: string, password: string,phone: string , fullname: string }) => {
        const url = '/users/register';
        return await axiosClient.post(url, data);
    },

    forgotPassword: async (data:{email: string}) =>{
        const url = '/users/forgot-password';
        return await axiosClient.post(url, data);
    },
    verifyOtp: async(data: {email: string, otp: string}) =>{
        const url = '/users/verify-otp';
        return await axiosClient.post(url, data);
    },
    resetPassword: async(data: {email: string, newPassword: string}) =>{
        const url = '/users/reset-password';
        return await axiosClient.post(url, data);
    },
    getProfile: async () => {
        const url = '/users/my-info';
        return await axiosClient.get(url);
    },
    changePassword: async (data:{currentPassword: string, newPassword: string}) =>{
        const url = '/users/change-password';
        return await axiosClient.post(url, data);
    }
};

export default authService;