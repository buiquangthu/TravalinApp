import axiosClient from "./axiosClient";

const airportService = {
    getAllAirports: async () => {
        try {
            const response = await axiosClient.get('/airports');
            return response.data;
        } catch (error) {
            console.error('Error fetching airports:', error);
            throw error;
        }
    }
}

export default airportService;