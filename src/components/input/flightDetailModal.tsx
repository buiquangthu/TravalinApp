import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { AppColors } from "@/utils/constant";
import ShareFlightCard from "../flight/flightCard";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
interface Props {
  visible: boolean;
  onClose: () => void;
  flight: any; // Tùy chỉnh type sau nếu cần
  passengers: number;
}

const FlightDetailModal = ({ visible, onClose, flight, passengers }: Props) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"flight" | "policy">("flight");
  
    if (!flight) return null;
  
    const formatTime = (str: string) => {
      const d = new Date(str);
      return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    };
  
    const formatCurrency = (num: number) =>
      num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
  
    const formatVietnameseDate = (isoDate: string): string => {
      const date = new Date(isoDate);
      const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
      const day = days[date.getDay()];
      const dayOfMonth = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day},${dayOfMonth}/${month}/${year}`;
    };
  
    const totalPrice = flight.price * passengers;
  
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Chi tiết chuyến bay</Text>
              <Pressable onPress={onClose}>
                <Text style={styles.close}>✕</Text>
              </Pressable>
            </View>
  
            {/* Tabs */}
            <View style={styles.tabs}>
              <Pressable onPress={() => setActiveTab("flight")}>
                <Text style={[styles.tab, activeTab === "flight" && styles.tabActive]}>
                  Chuyến bay
                </Text>
              </Pressable>
              <Pressable onPress={() => setActiveTab("policy")}>
                <Text style={[styles.tab, activeTab === "policy" && styles.tabActive]}>
                  Hoàn tiền, đổi lịch bay
                </Text>
              </Pressable>
            </View>
  
            <ScrollView style={styles.content}>
              {activeTab === "flight" ? (
                <>
                  {/* Flight Info */}
                  <View style={styles.flightCard}>
                    <View style={styles.bottomRow}>
                      <Image source={getAirlineLogo(flight.airlineCode)} style={styles.logo} />
                      <View style={{ paddingTop: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>{flight.airlineName} - {flight.flightClass}</Text>
                        <Text style={{ color: "#888" }}>{flight.flightNumber}</Text>
                      </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: "#EFEFF4", marginVertical: 10, marginHorizontal: 20 }}></View>
  
                    <View style={styles.row}>
                      <View style={styles.timeBlock}>
                        <Text style={styles.timeText}>{flight.originAirportCode}</Text>
                        <Text style={styles.codeText}>{formatTime(flight.departureDatetime)}</Text>
                        <Text>{formatVietnameseDate(flight.departureDatetime)}</Text>
                      </View>
  
                      <View style={styles.middleBlock}>
                        <Text style={styles.durationText}>{flight.duration} phút</Text>
                        <Icon name="long-arrow-right" size={20} color="#999" />
                      </View>
  
                      <View style={styles.timeBlock}>
                        <Text style={styles.timeText}>{flight.destinationAirportCode}</Text>
                        <Text style={styles.codeText}>{formatTime(flight.arrivalDatetime)}</Text>
                        <Text>{formatVietnameseDate(flight.arrivalDatetime)}</Text>
                      </View>
                    </View>
                  </View>
  
                  {/* Giá chi tiết */}
                  <View style={styles.priceRow}>
                    <Text>Khách hàng ({passengers})</Text>
                    <Text>{formatCurrency(totalPrice)}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text>Thuế</Text>
                    <Text>Đã bao gồm</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text>Hành lý</Text>
                    <Text>0 ₫</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text>Thủ tục ưu tiên</Text>
                    <Text>0 ₫</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text>Tổng số tiền</Text>
                    <Text style={{ color: AppColors.LIGHT_BLUE, fontWeight: "bold" }}>{formatCurrency(totalPrice)}</Text>
                  </View>
                </>
              ) : (
                <>
                  {/* Chính sách hoàn tiền, đổi lịch */}
                  <View style={styles.policyRow}>
                    <Text>Hoàn tiền</Text>
                    <Text style={styles.linkText}>Tìm hiểu thêm</Text>
                  </View>
                  <View style={styles.policyRow}>
                    <Text>Đổi lịch bay</Text>
                    <Text style={styles.linkText}>Tìm hiểu thêm</Text>
                  </View>
                </>
              )}
            </ScrollView>
  
            <Pressable
                style={styles.confirmButton}
                onPress={() => {
                    onClose(); // đóng modal trước
                    router.push({
                    pathname: "/customerInfoScreen",
                    params: {
                        flightId: flight.flightId,
                        price: flight.price,
                        passengers: passengers.toString(),
                    },
                    });
                }}
                >
                <Text style={styles.confirmText}>Chọn</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { fontWeight: "bold", fontSize: 16 },
  close: { fontSize: 18 },
  tabs: {
    flexDirection: "row",
    marginVertical: 12,
    gap: 16,
  },
  tab: {
    color: "#999",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 8,
    paddingHorizontal: 30,
},
  tabActive: { fontWeight: "bold", color: AppColors.LIGHT_BLUE },
  content: { marginBottom: 20 },
  route: { fontWeight: "bold", marginBottom: 4 },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  confirmButton: {
    backgroundColor: AppColors.LIGHT_BLUE,
    borderRadius: 10,
    padding: 14,
  },
  confirmText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  flightCard:{
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EFEFF4",
  },
  bottomRow:{
    flexDirection: "row",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 8,
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
    marginLeft: -40,
  },
  codeText: {
    fontSize: 14,
    color: "#666",
    marginLeft: -40,
  },
  durationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },  
  policyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  linkText: {
    color: AppColors.LIGHT_BLUE,
    fontWeight: "500",
  },

});

export default FlightDetailModal;
