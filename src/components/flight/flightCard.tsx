import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface IProps {
  airlineName: string;
  airlineCode: string;
  originCode: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  price: number;
  originalPrice?: number;
  onPress: () => void;
  showLogo?: boolean;
}

const ShareFlightCard = (props: IProps) => {
  const {
    airlineName,
    airlineCode,
    originCode,
    destinationCode,
    departureTime,
    arrivalTime,
    duration,
    price,
    originalPrice,
    onPress,
    showLogo = true,
  } = props;

  const durationHour = Math.floor(duration / 60);
  const durationMin = duration % 60;
  const durationStr = `${durationHour}g ${durationMin}p`;

  const formarPrice = (price: number) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>{departureTime}</Text>
          <Text style={styles.codeText}>{originCode}</Text>
        </View>

        <View style={styles.middleBlock}>
          <Text style={styles.durationText}>{durationStr}</Text>
          {/* <Text style={styles.flightTypeText}>Bay thẳng</Text> */}
          <Icon name="long-arrow-right" size={20} color="#999" />
        </View>

        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>{arrivalTime}</Text>
          <Text style={styles.codeText}>{destinationCode}</Text>
        </View>

        <View style={styles.priceBlock}>
          <Text style={styles.priceText}>{formarPrice(price)} ₫</Text>
          {originalPrice && originalPrice > price && (
            <Text style={styles.originalPriceText}>{formarPrice(originalPrice)} ₫</Text>
          )}
        </View>
      </View>

      <View style={styles.bottomRow}>
        {showLogo && <Image source={getAirlineLogo(airlineCode)} style={styles.logo} />}
        <Text>{airlineName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getAirlineLogo = (airlineCode: string) => {
  switch (airlineCode) {
    case "VN":
      return require("@/assets/imageAirline/vn.jpg");
    case "VJ":
      return require("@/assets/imageAirline/vj.jpg");
    case "QH":
      return require("@/assets/imageAirline/qh.jpg");
    case "BL":
      return require("@/assets/imageAirline/bl.jpg");
    default:
      return require("@/assets/imageAirline/vus.jpg");
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F9F9FB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  timeBlock: {
    alignItems: "center",
    marginRight: 8,
  },
  middleBlock: {
    flex: 1,
    alignItems: "center",
  },
  timeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  codeText: {
    fontSize: 14,
    color: "#666",
  },
  durationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  flightTypeText: {
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
  },
  priceBlock: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: "auto",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  originalPriceText: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 12,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 8,
  },
});

export default ShareFlightCard;
