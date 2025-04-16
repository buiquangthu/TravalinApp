import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AppColors } from "@/utils/constant";
import ticketService from "@/apis/tickerService";

const TicketDetailScreen = () => {
  const { ticketId } = useLocalSearchParams();
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await ticketService.getTicketDetail(ticketId as string);
        setTicket(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy vé:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (loading || !ticket) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={AppColors.LIGHT_BLUE} />
      </View>
    );
  }

  const {
    flight,
    contact,
    passengers,
    pricing,
    status,
    bookingCode
  } = ticket;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "success":
        return { label: "Xuất vé thành công", color: "#4CAF50" };
      case "holding":
        return { label: "Đang giữ chỗ", color: "#FFC107" };
      case "failed":
        return { label: "Xuất vé thất bại", color: "#F44336" };
      default:
        return { label: "Không xác định", color: "#999" };
    }
  };

  const statusInfo = getStatusStyle(status);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.route}>
          {flight.from} → {flight.to}
        </Text>
        <Text style={[styles.status, { backgroundColor: statusInfo.color }]}>
          {statusInfo.label}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Chuyến đi:</Text>
        <Text>{flight.airline} - {flight.class}</Text>
        <Text>{flight.from} ({new Date(flight.departure).toLocaleString()})</Text>
        <Text>{flight.to} ({new Date(flight.arrival).toLocaleString()})</Text>
        <Text style={styles.bookingCode}>Mã đặt chỗ: {bookingCode}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chi tiết giá</Text>
        <Text>2 người lớn: {pricing.adultPrice.toLocaleString("vi-VN")} đ</Text>
        <Text>1 trẻ em: {pricing.childPrice.toLocaleString("vi-VN")} đ</Text>
        <Text>Em bé: {pricing.infantPrice.toLocaleString("vi-VN")} đ</Text>
        <Text>Thuế: {pricing.tax.toLocaleString("vi-VN")} đ</Text>
        <Text style={{ color: "green" }}>Giảm giá: -{pricing.discount.toLocaleString("vi-VN")} đ</Text>
        <Text style={styles.total}>Tổng cộng: {pricing.total.toLocaleString("vi-VN")} đ</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin hành khách</Text>
        {passengers.map((p: any, idx: number) => (
          <Text key={idx}>• {p.type}: {p.fullName}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
        <Text>Họ tên: {contact.fullName}</Text>
        <Text>Số điện thoại: {contact.phone}</Text>
        <Text>Email: {contact.email}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 16,
  },
  route: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.LIGHT_BLUE,
  },
  status: {
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
    alignSelf: "flex-start",
  },
  bookingCode: {
    marginTop: 8,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 16,
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
  },
  total: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: AppColors.LIGHT_BLUE,
  },
});

export default TicketDetailScreen;
