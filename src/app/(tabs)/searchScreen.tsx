import DateInput from "@/components/input/dateInput";
import DropdownInput from "@/components/input/dropdownInput";
import ShareInput from "@/components/input/input.share";
import ShareText from "@/components/input/text.share";
import { AppColors } from "@/utils/constant";
import { useRouter } from "expo-router"
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View, Image, Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons";
import AirportSelectorModal from "@/components/input/selectorModal";
import airportService from "@/apis/airportService"
import PassegerInput from "@/components/modal/passegerInput";
import { format } from "date-fns";


interface Airport {
  code: string;
  location: string;
  display: string;
}

const SearchScreen = () => {

  const router = useRouter();

  const [origin, setOrigin] = useState<Airport | null>(null);
  const [destination, setDestination] = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [passengers, setPassengers] = useState({ adult: 1, child: 0, baby: 0 });
  const [seatClass, setSeatClass] = useState("Economy");
  const [isShowPassengerModal, setIsShowPassengerModal] = useState(false);
  const [showOriginModal, setShowOriginModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [airportList, setAirportList] = useState<Airport[]>([]);
  const [recentAirport, setRecentAirport] = useState<Airport[]>([]);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await airportService.getAllAirports();
        const formatted = data.map((item: any) => ({
          code: item.airport_code,
          location: item.location,
          display: `${item.airport_code} - ${item.location}`,
        }));
        setAirportList(formatted);
      } catch (error) {
        console.error("Lỗi lấy danh sách sân bay:", error);
      }
    };

    fetchAirports();
  }, []);

  const handleSearch = () => {
    if (!origin) {
      Alert.alert("Thông báo", "Bạn chưa điền đủ thông tin.")
      return;
    }
    if(!destination){
      Alert.alert("Thông báo", "Bạn chưa chọn điểm đến.")
      return;
    }
    // if(!departureDate){
    //   Alert.alert("Thông báo", "Bạn chưa chọn ngày đi.")
    //   return;
    // }
    if (isRoundTrip && returnDate && departureDate && returnDate < departureDate) {
      Alert.alert("Thông báo", "Ngày về phải sau ngày đi.");
      return;
    }
    if(origin.code === destination.code){
      Alert.alert("Thông báo", "Điểm đi và điểm đến không thể giống nhau.");
      return;
    }
    console.log("Search params:", {
      origin: origin?.code,
      destination: destination?.code,
      departureDate: departureDate ? format(departureDate, "yyyy-MM-dd") : "",
      returnDate: returnDate?.toISOString(),
      seatClass,
      passengers,
      isRoundTrip
    });

    router.push({
      pathname: "/searchResultScreen",
      params: {
        origin: origin?.code ?? "",
        destination: destination?.code ?? "",
        departureDate: departureDate ? format(departureDate, "yyyy-MM-dd") : "",
        returnDate: returnDate?.toISOString() ?? "",
        seatClass,
        passengers: JSON.stringify(passengers),
        isRoundTrip: isRoundTrip.toString()
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('@/assets/imageAirline/banerSearch.jpg')} style={{ width: "100%" }} />

      <View style={styles.overlayInputWrapper}>
        <View style={styles.boxSearch}>

          <ShareText
            text="Điểm đi"
            icon={<MaterialIcons name="flight-takeoff" size={18} color="#999" />}
            style={styles.title}
          />
          <ShareInput
            placeholder="Chọn điểm đi"
            value={origin?.display || ""}
            editable={false}
            onPressIn={() => setShowOriginModal(true)}

          />

          <AirportSelectorModal
            visible={showOriginModal}
            title="Chọn điểm đi"
            airportList={airportList}
            recentSearches={recentAirport}
            onClose={() => setShowOriginModal(false)}
            onSelect={(airport) => {
              setOrigin(airport);
              setRecentAirport((prev) =>
                [airport, ...prev.filter((a) => a.code !== airport.code)].slice(0, 3)
              );
              setShowOriginModal(false);
            }}
          />

          <View style={{ alignItems: "flex-end"}}>
            <Pressable
              onPress={() => {
                const temp = origin;
                setOrigin(destination);
                setDestination(temp);
              }}
              style={styles.swap}
            >
              <MaterialIcons name="swap-vert" size={24} color="#444" />
            </Pressable>
          </View>

          <ShareText
            text="Điểm đến"
            icon={<MaterialIcons name="flight-land" size={18} color="#999" />}
            style={styles.title}
          />
          <ShareInput
            placeholder="Chọn điểm đến"
            value={destination?.display || ""}
            editable={false}
            onPressIn={() => setShowDestinationModal(true)}
          />


          <AirportSelectorModal
            visible={showDestinationModal}
            title="Chọn điểm đến"
            airportList={airportList}
            recentSearches={recentAirport}
            onClose={() => setShowDestinationModal(false)}
            onSelect={(airport) => {
              setDestination(airport);
              setRecentAirport((prev) =>
                [airport, ...prev.filter((a) => a.code !== airport.code)].slice(0, 3)
              );
              setShowDestinationModal(false);
            }}
          />


          <DateInput
            label="Ngày đi"
            value={departureDate}
            onChange={setDepartureDate}
          />

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Khứ hồi</Text>
            <Switch value={isRoundTrip} onValueChange={setIsRoundTrip} />
          </View>

          {isRoundTrip && (
            <>
              <DateInput
                label="Ngày về"
                value={returnDate}
                onChange={setReturnDate}
              />
            </>
          )}

          <View style={styles.row}>
            {isShowPassengerModal && (
              <PassegerInput
                handleClose={() => setIsShowPassengerModal(false)}
                onConfirm={(newPassengers) => {
                  setPassengers(newPassengers);
                  setIsShowPassengerModal(false);
                }}
              />)}
            <Pressable onPress={() => setIsShowPassengerModal(true)}>
              <ShareText
                text={`Hành khách`}
                icon={<MaterialIcons name="people" size={18} color="#999" />}
              />

            </Pressable>

            {isShowPassengerModal && (
              <PassegerInput
                handleClose={() => setIsShowPassengerModal(false)}
                defaultValue={passengers}
                onConfirm={(newPassegers) => {
                  setPassengers(newPassegers);
                  setIsShowPassengerModal(false);
                }}
              />
            )}

            <DropdownInput
              label="Hạng ghế"
              value={seatClass}
              onChange={setSeatClass}
              options={["Economy", "Business", "First Class"]}
              placeholder="Chọn"
            />

          </View>


          <Pressable style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Tìm chuyến bay</Text>
          </Pressable>
        </View>

      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    paddingStart: 15,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: AppColors.BLACK,
    fontWeight: "500",
  },
  searchButton: {
    backgroundColor: AppColors.JAZZBERRY_JAM,
    padding: 16,
    borderRadius: 10,
    marginTop: 24,
    marginHorizontal: 15,
  },
  searchButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  boxSearch: {
    // padding: 15,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 16,
    marginBottom: 32,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,

  },
  overlayInputWrapper: {
    marginTop: -60, 
    paddingHorizontal: 16,
    zIndex: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  swap:{
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  }
});

export default SearchScreen;