import axiosClient from "./axiosClient";

export interface BookingInformation {
    flightId: number
    contact: Contact
    passengers: Passenger[]
}
  
export interface Contact {
    fullName: string
    phone: string
    email: string
}
  
export interface Passenger {
    firstName: string
    lastName: string
    email: string
    passportNumber: string
    nationality: string
    dateOfBirth: string
}

const bookingService = {
    bookTicket: async (bookingInfomation: BookingInformation) => {
        try {
            const response = await axiosClient.post(`/bookings`, bookingInfomation);
            return response.data;
        } catch (error) {
            console.error('Error booking ticket:', error);
            throw error;
        }
    },
};

const confirmBooking = async (bookingId: string, paymentIntentId: string,) => {
    try {
        const response = await axiosClient.post(`/bookings/confirm`, { bookingId,  paymentIntentId });
        return response.data;
    } catch (error) {
        console.error('Error confirming booking:', error);
        throw error;
    }
}

export { bookingService, confirmBooking };