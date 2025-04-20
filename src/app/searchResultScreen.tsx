import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import flightService from "@/apis/flightService";
import { AppColors } from "@/utils/constant";
import ShareFlightCard from "@/components/flight/flightCard";
import FlightDetailModal from "@/components/input/flightDetailModal";


interface Flight {
  flightId: number;
  flightNumber: string;
  airlineCode: string;
  airlineName: string;
  originAirportCode: string;
  originAirportName: string;
  destinationAirportCode: string;
  destinationAirportName: string;
  departureDatetime: string;
  arrivalDatetime: string;
  availableSeats: number;
  status: string;
  duration: number;
  price: number;
  stops: number;
  flightClass: string;
}

const SearchResultScreen = () => {

  const router = useRouter();
  const {
    origin,
    destination,
    departureDate,
    passengers,
  } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const scaleAnimations = useMemo(() => Array.from({ length: 30 }, () => new Animated.Value(1)), []);

  const passengerObj = passengers ? JSON.parse(passengers as string) : { adult: 1, child: 0, baby: 0 };
  const passengerCount = passengerObj.adult + passengerObj.child + passengerObj.baby;

  // const passengerCount = useMemo(() => {
  //   const match = (passengers as string)?.match(/\d+/);
  //   return match ? parseInt(match[0], 10) : 1;
  // }, [passengers]);

  const dates = useMemo(() => {
    const result = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const current = new Date(today);
      current.setDate(today.getDate() + i);
      result.push({
        label: format(current, "EEEE", { locale: vi }),
        date: format(current, "dd/MM/yyyy"),
        fullDate: current,
      });
    }
    return result;
  }, []);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      const rawParams = {
        originAirportCode: origin,
        destinationAirportCode: destination,
        date: format(dates[selectedDateIndex].fullDate, "yyyy-MM-dd"),
      };
      const params = Object.fromEntries(
        Object.entries(rawParams).filter(([_, v]) => v !== undefined && v !== null && v !== "")
      );
      try {
        const data = await flightService.searchFlights(params);
        setFlights(data);
      } catch (err: any) {
        console.error("Lỗi khi tìm chuyến bay:", err?.response?.data || err.message);
        setFlights([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, [selectedDateIndex]);

  const handleDateSelect = (index: number) => {
    Animated.sequence([
      Animated.timing(scaleAnimations[index], {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimations[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setSelectedDateIndex(index);
  };

  const renderFlight = ({ item }: { item: Flight }) => (
    <ShareFlightCard
      airlineName={item.airlineName}
      airlineCode={item.airlineCode}
      originCode={item.originAirportCode}
      destinationCode={item.destinationAirportCode}
      departureTime={formatTime(item.departureDatetime)}
      arrivalTime={formatTime(item.arrivalDatetime)}
      duration={item.duration}
      price={item.price}
      onPress={() => setSelectedFlight(item)}
    />
  );

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={flights}
        renderItem={renderFlight}
        keyExtractor={(item) => item.flightId.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.custom}>
              <TouchableOpacity style={styles.buttonBack}
                onPress={() => router.back()
                }
              >
                <Ionicons name="chevron-back" size={25} color="black" />
              </TouchableOpacity>
              <Text style={styles.header}>Chuyến đi {origin} - {destination || 'Tất cả'}</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateTab}>
              {dates.map((item, index) => (
                <Animated.View key={index} style={{ transform: [{ scale: scaleAnimations[index] }] }}>
                  <Pressable
                    onPress={() => handleDateSelect(index)}
                    style={[styles.dateItem, index === selectedDateIndex && styles.dateItemSelected]}
                  >
                    <Text style={index === selectedDateIndex ? styles.dateTextSelected : styles.dateText}>{item.label}</Text>
                    <Text style={index === selectedDateIndex ? styles.dateTextSelected : styles.dateText}>{item.date}</Text>
                  </Pressable>
                </Animated.View>
              ))}
            </ScrollView>

            <View style={styles.filterBar}>
              <Pressable style={styles.filterButton}>
                <Text style={styles.filterText}>🔍 Lọc</Text>
              </Pressable>
              <Pressable style={styles.sortButton}>
                <Text style={styles.sortText}>Giá thấp nhất</Text>
              </Pressable>
            </View>

            <Text style={styles.taxNote}>Giá đã bao gồm thuế và phí</Text>
          </>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={AppColors.LIGHT_BLUE} />
          ) : (
            <Text style={styles.noResult}>Không tìm thấy chuyến bay phù hợp.</Text>
          )
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />

    <FlightDetailModal
      visible={!!selectedFlight}
      flight={selectedFlight}
      passengers={{
        adult: passengerObj.adult,
        child: passengerObj.child,
        baby: passengerObj.baby
      }}
      onClose={() => setSelectedFlight(null)}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  taxNote: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
    marginTop: -4,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    color: AppColors.WHITE,
    paddingTop: 30,
  },
  noResult: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
  dateTab: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  dateItem: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 8,
  },
  dateItemSelected: {
    backgroundColor: AppColors.TEAL_BLUE,
  },
  dateText: {
    color: "#333",
    fontSize: 12,
    textAlign: "center",
  },
  dateTextSelected: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 8,
    marginLeft: 15,
    width: 80,
  },
  filterText: {
    color: "#333",
  },
  sortButton: {
    marginRight: 25,
    borderRadius: 15,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  sortText: {
    color: AppColors.LIGHT_BLUE,
    fontWeight: "bold",
  },
  custom: {
    height: 130,
    backgroundColor: AppColors.LIGHT_BLUE,
    flexDirection: "row",
  },
  buttonBack: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: AppColors.LIGHT_BLUE,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    marginTop: 30,
    marginHorizontal: 13,
  },
});

export default SearchResultScreen;
