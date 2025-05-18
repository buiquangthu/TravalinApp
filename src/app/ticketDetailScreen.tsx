import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AppColors } from "@/utils/constant";
import axios from "axios";
import ticketService from "@/apis/tickerService";
import ScreenContainer from "@/components/layout/screenContainer";
import Icon from "react-native-vector-icons/FontAwesome";

const TicketDetailScreen = () => {
  const { ticketId } = useLocalSearchParams();
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const formatVietnameseDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const day = days[date.getDay()];
    const dayOfMonth = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day},${dayOfMonth}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        if (typeof ticketId === "string") {
          const data = await ticketService.getTicketDetail(ticketId);
          setTicket(data);
        } else {
          console.error("Invalid ticketId:", ticketId);
        }
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết vé:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [ticketId]);

  const formatCurrency = (num: number) =>
    num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";

  const formatTime = (str: string) => {
    const d = new Date(str);
    return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  };



  if (loading) return <ActivityIndicator size="large" color={AppColors.LIGHT_BLUE} />;
  if (!ticket) return <Text>Không tìm thấy thông tin vé.</Text>;

  const { flight, passengers, contact, pricing, status } = ticket;

  const getStatusStyle = () => {
    switch (status) {
      case "Confirmed":
        return { label: "Xuất vé thành công", color: "#4CAF50" };
      case "Pending":
        return { label: "Đang giữ chỗ", color: "#FFC107" };
      case "Cancelled":
        return { label: "Xuất vé thất bại", color: "#F44336" };
      default:
        return { label: status, color: "#999" };
    }
  };

  const statusInfo = getStatusStyle();
  const getDurationInMinutes = (departure: string, arrival: string) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = (arr.getTime() - dep.getTime()) / (1000 * 60); // phút
    return Math.round(diff);
  };
  
  const duration = getDurationInMinutes(flight.departure, flight.arrival);
  

  return (
    <ScreenContainer title={`${ticket?.flight?.from} - ${ticket?.flight?.to}`}>
        <ScrollView style={styles.container}>
          <Text style={styles.statusText}>{statusInfo.label}</Text>

          <View style={styles.flightCard}>
                    <View style={styles.bottomRow}>
                    <Image source={getAirlineLogo(flight.airlineCode)} style={styles.logo} />
                      <View style={{ paddingTop: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>{flight.airline} - {flight.flightClass}</Text>
                        <Text style={{ color: "#888" }}>{flight.flightNumber}</Text>
                      </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: "#EFEFF4", marginVertical: 10, marginHorizontal: 20 }}></View>
  
                    <View style={styles.row}>
                      <View style={styles.timeBlock}>
                        <Text style={styles.timeText}>{flight.originAirportCode}</Text>
                        <Text style={styles.codeText}>{formatTime(flight.departure)}</Text>
                        <Text>{formatVietnameseDate(flight.departure)}</Text>
                      </View>
  
                      <View style={styles.middleBlock}>
                        <Text style={styles.durationText}>{duration} phút</Text>
                        <Icon name="long-arrow-right" size={20} color="#999" />
                      </View>
  
                      <View style={styles.timeBlock}>
                        <Text style={styles.timeText}>{flight.destinationAirportCode}</Text>
                        <Text style={styles.codeText}>{formatTime(flight.arrival)}</Text>
                        <Text>{formatVietnameseDate(flight.arrival)}</Text>
                      </View>
                    </View>
          </View>

          <Text style={styles.section}>Chi tiết giá</Text>
          <View style={styles.priceRow}><Text>{pricing.adults} người lớn</Text><Text>{formatCurrency(pricing.adultPrice * pricing.adults)}</Text></View>
          <View style={styles.priceRow}><Text>{pricing.children} trẻ em</Text><Text>{formatCurrency(pricing.childPrice * pricing.children)}</Text></View>
          <View style={styles.priceRow}><Text>{pricing.infants} em bé</Text><Text>{formatCurrency(pricing.infantPrice * pricing.infants)}</Text></View>
          <View style={styles.priceRow}><Text>Thuế</Text><Text>Đã bao gồm</Text></View>
          <View style={styles.priceRow}><Text>Giảm giá</Text><Text style={{ color: "green" }}>-{formatCurrency(pricing.discount)}</Text></View>
          <View style={styles.totalRow}><Text>Tổng số tiền</Text><Text style={styles.total}>{formatCurrency(pricing.total)}</Text></View>

          <Text style={styles.section}>Thông tin hành khách</Text>
          <View style={styles.card}>
            {passengers.map((p: any, index: number) => (
              <View key={index} style={styles.passengerRow}>
                <View style={styles.passengerLabel}>
                  <Icon name="user" size={16} color="#666" style={{ marginRight: 6 }} />
                  <Text style={styles.passengerTitle}>
                    Hành khách {index + 1} - {p.type}
                  </Text>
                </View>
                <Text style={styles.passengerName}>{p.fullName.toUpperCase()}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.section}>Thông tin liên hệ</Text>
          <View style={styles.card}>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Họ và tên</Text>
              <Text style={styles.contactValue}>{contact.fullName.toUpperCase()}</Text>
            </View>

            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Số điện thoại</Text>
              <Text style={styles.contactValue}>{contact.phone}</Text>
            </View>

            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={[styles.contactValue, { textTransform: "none" }]}>{contact.email}</Text>
            </View>
          </View>


      </ScrollView>
    </ScreenContainer>
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
  container: {
    padding: 16,
    backgroundColor: "#fff",
    margin: -16
  },
  statusText: {
    backgroundColor: AppColors.LIGHT_GREEN,
    color: "#00796b",
    padding: 6,
    borderRadius: 20,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    marginStart: 10,
    marginEnd: "auto",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  route: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bookingCode: {
    marginTop: 8,
    fontWeight: "600",
    color: AppColors.LIGHT_BLUE,
  },
  section: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
    color: AppColors.LIGHT_BLUE,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: 10,
  },
  total: {
    fontWeight: "bold",
    color: AppColors.LIGHT_BLUE,
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
  passengerRow: {
    marginBottom: 12,
  },
  
  passengerLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  
  passengerTitle: {
    fontWeight: "500",
    color: "#333",
  },
  
  passengerName: {
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 22,
    color: "#111",
  },
  contactRow: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  
  contactLabel: {
    color: "#666",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 2,
  },
  
  contactValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111",
    textTransform: "uppercase",
  },
  
  
});

export default TicketDetailScreen;
