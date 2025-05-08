import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { AppColors } from "@/utils/constant";
import ticketService from "@/apis/tickerService";
import ScreenContainer from "@/components/layout/screenContainer";
 

const MyTicketsScreen = () => {
  const router = useRouter();
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await ticketService.getMyTickets();
        // console.log("Vé của tôi:", res);
        const sortedTickets = [...(res || [])].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setTickets(sortedTickets);
      } catch (err) {
        console.error("Lỗi lấy vé:", err);
      }
    };

    fetchTickets();
  }, []);

  const groupByMonthYear = (tickets: any[]) => {
    if (!Array.isArray(tickets)) return {}; // tránh lỗi nếu undefined
    return tickets.reduce((acc, ticket) => {
      const date = new Date(ticket.date);
      const key = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
      acc[key] = acc[key] || [];
      acc[key].push(ticket);
      return acc;
    }, {} as Record<string, any[]>);
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "Confirmed":
        return { label: "Thanh toán thành công", color: "#4CAF50" };
      case "Pending":
        return { label: "Chưa thanh toán", color: "#FFC107" };
      case "Cancelled":
        return { label: "Xuất vé thất bại", color: "#F44336" };
      default:
        return { label: "Không rõ", color: "#ccc" };
    }
  };
  
  const grouped = groupByMonthYear(tickets);

  return (
    <ScreenContainer title="Vé của tôi"
    showBack = {false}
    >
        <ScrollView style={styles.container}>
      {tickets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("@/assets/imageSlider/flight.jpg")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>Bạn chưa có vé nào</Text>
          <Text style={styles.suggestion}>Tham khảo hàng trăm chuyến bay khác</Text>
          <Pressable
            style={styles.button}
            onPress={() => router.push("/(tabs)/searchScreen")}
          >
            <Text style={styles.buttonText}>Đặt vé</Text>
          </Pressable>
        </View>
      ) : (
        Object.keys(grouped).map((monthYear) => (
          <View key={monthYear}>
            <Text style={styles.monthHeader}>{monthYear}</Text>
            {grouped[monthYear].map((ticket:any) => {
              const statusInfo = getStatus(ticket.status);
              return (
                <Pressable
                  key={ticket.id}
                  style={styles.ticketCard}
                  onPress={() =>
                    router.push({
                      pathname: "/ticketDetailScreen",
                      params: { ticketId: ticket.id },
                    })
                  }
                >
                  <Text style={[styles.status, { backgroundColor: statusInfo.color }]}>
                    {statusInfo.label}
                  </Text>
                  <Text style={styles.route}>
                        {ticket.flight?.from} → {ticket.flight?.to}
                    </Text>
                  <Text style={styles.code}>Mã đơn hàng: {ticket.code}</Text>
                  <Text style={styles.price}>
                    {ticket.price.toLocaleString("vi-VN")} ₫
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))
      )}
    </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    margin: -20
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: AppColors.LIGHT_BLUE,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  suggestion: {
    color: "gray",
    marginBottom: 20,
  },
  button: {
    backgroundColor: AppColors.LIGHT_BLUE,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  monthHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
  },
  ticketCard: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  status: {
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  route: {
    fontWeight: "600",
  },
  code: {
    fontSize: 13,
    color: "gray",
  },
  price: {
    fontWeight: "bold",
    color: AppColors.LIGHT_BLUE,
    marginTop: 6,
  },
});

export default MyTicketsScreen;
