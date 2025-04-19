import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { AppColors } from "@/utils/constant";
import flightService from "@/apis/flightService";
import authService from "@/apis/authService";
import ImageSlider from "@/components/imageSlider/ImageSlider";
import ShareFlightCard from "@/components/flight/flightCard";
import FlightDetailModal from "@/components/input/flightDetailModal";

interface Flight {
    flightId: number;
    flightNumber: string;
    airlineName: string;
    airlineCode: string;
    originAirportCode: string;
    originAirportName: string;
    destinationAirportCode: string;
    destinationAirportName: string;
    departureDatetime: string;
    arrivalDatetime: string;
    price: number;
    flightClass: string;
    status: string;
}


const HomeTab = () => {
    const router = useRouter();
    const [fullname, setFullname] = useState("Bạn");
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const passengerCount = 1;

    useEffect(() =>{
        const fetchFlights = async () => {
            try{
                const data = await flightService.getAllFlights();
                const openFlights = data.filter((flight: Flight) => flight.status === "OPEN");
                const shuffled = openFlights.sort(() => 0.5 - Math.random());
                const randomFlights = shuffled.slice(0, 7); // Hiển thị 5 chuyến ngẫu nhiên
                setFlights(randomFlights);
            }catch(error){
                console.error("Error fetching flights:", error);
            }finally{
                setLoading(false);
            }
        };

        const fetchUser = async () => {
            try{
                const response = await authService.getProfile();
                setFullname(response.data.fullname);
            }catch(error){
                console.error("Error fetching user profile:", error);
            }
        };
        fetchFlights();
        fetchUser();
    }, []);

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      };


 
  const renderFlight = (item: Flight) => {
    const departureDate = new Date(item.departureDatetime);
    const arrivalDate = new Date(item.arrivalDatetime);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return(
        <ShareFlightCard
            key={item.flightId}
            airlineName={item.airlineName}
            airlineCode={item.airlineCode}
            originCode={item.originAirportCode}
            destinationCode={item.destinationAirportCode}
            departureTime={formatTime(departureDate)}
            arrivalTime={formatTime(arrivalDate)}
            duration={Math.floor((arrivalDate.getTime() - departureDate.getTime()) / 60000)} // Tính thời gian bay bằng phút
            price={item.price}
            onPress={() => setSelectedFlight(item)}
        />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello {fullname}</Text>
      
        <Pressable onPress={() => router.push("/(tabs)/searchScreen")} style={styles.searchBar}>
         <Text style={styles.searchText}>🔍 Tìm chuyến bay...</Text>
        </Pressable>
      
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#f5f5fa", paddingHorizontal: 20}}>
            <ImageSlider/>
            <Text style={styles.subHeader}>Thông tin chuyến bay</Text>
            {loading ? (
            
            <ActivityIndicator size="large" color={AppColors.JAZZBERRY_JAM} />
        ) : (
            flights.map(renderFlight)
      )}
        </ScrollView>


        <FlightDetailModal
        visible={!!selectedFlight}
        flight={selectedFlight}
        passengers={passengerCount}
        onClose={() => setSelectedFlight(null)}
      />

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.LIGHT_BLUE,
        // padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    subHeader: {
        fontSize: 18,
        color: "gray",
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
    flightCard: {
        backgroundColor: "#f8f9fa",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    flightInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    time: {
        fontSize: 16,
        fontWeight: "bold",
    },
    duration: {
        fontSize: 14,
        color: "gray",
    },
    flightRoute: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    airport: {
        fontSize: 16,
        fontWeight: "bold",
    },
    stops: {
        fontSize: 14,
        color: "gray",
    },
    airlineInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    airlineLogo: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    airline: {
        fontSize: 14,
        fontWeight: "bold",
    },
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: AppColors.LIGHT_GRAY,
        marginBottom: 12,
      },
      flightNumber: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
      },
      price: {
        fontWeight: "bold",
        color: AppColors.JAZZBERRY_JAM,
        marginTop: 8,
      },
      searchBar: {
        marginTop: 20,
        padding: 12,
        borderRadius: 25,
        backgroundColor: "#f0f0f0",
        marginBottom: 16,
        marginHorizontal: 20,
      },
      searchText: {
        color: "#666",
        fontSize: 16,
      },
});

export default HomeTab;
