
import axios from "axios";
import axiosClient from "./axiosClient";


const flightService = {

    // laays tất cả các chuyến bay
    getAllFlights: async () => {
        try{
            const response = await axiosClient.get('/flights');
            return response.data;
        }catch(error){
            console.error('Error fetching flights:', error);
            throw error;
        }
    },

    // lay các chuyến bay theo id
    getFlightById: async (id: number) => {
        try {
            const response = await axiosClient.get(`/flights/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching flight with ID ${id}:`, error);
            throw error;
        }
    },
    // flightService.ts
    searchFlights: async (params: { originAirportCode?: string; destinationAirportCode?: string; date?: string }) => {
        try {
        const response = await axiosClient.post("/flights/search", params);
        return response.data;
        } catch (error) {
        console.error("Error searching flights:", error);
        throw error;
        }
    },

  
    
}

export default flightService;