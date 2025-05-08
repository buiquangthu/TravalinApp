import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosClient = axios.create({
    // baseURL: 'http://192.168.1.16:8080/flight_booking',
    // baseURL: 'http://192.168.7.221:8080/flight_booking', // A51
    baseURL: 'http://192.168.1.38:8080/flight_booking',
    // baseURL: 'http://192.168.88.101:8080/flight_booking',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});
// interceptor xu ly request
axiosClient.interceptors.request.use(
    async (config) => {
        // neu co token them vao header
        const token = await AsyncStorage.getItem('accessToken');
        // console.log("Access token:", token); 
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
    return config;
    },
    (error) => {
        console.log("Request error: ", error);
        return Promise.reject(error);
    }
);

// interceptor xu ly response
axiosClient.interceptors.response.use(
    (response) => {
        return response
    },

    async (error) => {
        console.log("API error: ", error);
        return Promise.reject(error);
    }
);

export default axiosClient;
