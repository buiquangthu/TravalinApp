import axiosClient from "./axiosClient";

const ticketService = {
    getMyTickets: async () => {
        try{
            const response = await axiosClient.get('/tickets/me');
            return response.data;
        }catch(error){
            console.error('Error fetching flights:', error);
            throw error;
        }
    },
    getTicketDetail: async (ticketId: string) => {
        try {
            const response = await axiosClient.get(`/tickets/${ticketId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ticket with ID ${ticketId}:`, error);
            throw error;
        }
    }
}

export default ticketService;