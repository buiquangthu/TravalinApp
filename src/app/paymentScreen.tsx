import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppColors } from "@/utils/constant";
import ScreenContainer from "@/components/layout/screenContainer";
import {bookingService, confirmBooking} from "@/apis/bookingService";
import { confirmPayment } from "@stripe/stripe-react-native";
import { useStripe } from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  const router = useRouter();
  const {
    price,
    passengers,
    contactName,
    contactLastName,
    phone,
    email,
    flightId,
  } = useLocalSearchParams();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const passengerList = passengers ? JSON.parse(passengers as string) : [];

  const [paymentMethod, setPaymentMethod] = useState("Momo");
  const [voucherCode, setVoucherCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const total = Number(price);

  const handleCreateBooking = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await bookingService.bookTicket({
        flightId: Number(flightId),
        passengers: passengerList,
        contact: {
          fullName: contactName + " " + contactLastName,
          phone:  String(phone),
          email: String(email),
        }
      });

      const { clientSecret, bookingId, paymentIntentId } = response;
      
      // Khởi tạo payment sheet
      const { error: initPaymentError } = await initPaymentSheet({
        merchantDisplayName: 'Hệ thống đặt vé máy bay',
        paymentIntentClientSecret: response.clientSecret,
      });
      if (initPaymentError) {
        Alert.alert("Lỗi", "Không thể khởi tạo giao diện thanh toán.");
        return;
      }
      
      const { error: presentPaymentError } = await presentPaymentSheet();

      if (presentPaymentError) {
        Alert.alert("Thanh toán thất bại", "Vui lòng thử lại.");
        return;
      }
  
      // 4. Gửi yêu cầu xác nhận booking sau khi thanh toán thành công
      try {
        await confirmBooking(bookingId, paymentIntentId);
        Alert.alert("Thành công", "Đặt vé thành công. Vé đã được gửi qua email!");
        router.replace("/(tabs)/orderHistoryScreen");
      } catch (confirmError) {
        Alert.alert("Lỗi", "Thanh toán thành công nhưng xác nhận vé thất bại.");
      }
    } catch (error) {
      console.error("Lỗi đặt vé:", error);
      Alert.alert("Lỗi", "Không thể tạo đơn đặt vé. Vui lòng thử lại.");
    }finally {
      setLoading(false); 
    }
  }

  return (
    <ScreenContainer title="Xác nhận thanh toán">
      <ScrollView style ={styles.container}>

      {/* Phương thức thanh toán */}
      <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
      {["Thẻ tín dụng"].map((method) => (
        <Pressable
          key={method}
          style={[
            styles.paymentOption,
            paymentMethod === method && styles.paymentOptionSelected,
          ]}
          onPress={() => setPaymentMethod(method)}
        >
          <Text>{method}</Text>
        </Pressable>
      ))}

      {/* Mã giảm giá */}
      <Text style={styles.sectionTitle}>Mã giảm giá</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã giảm giá"
        value={voucherCode}
        onChangeText={setVoucherCode}
      />

      {/* Thông tin liên hệ */}
      <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
      <Text>Họ tên: {contactLastName} {contactName}</Text>
      <Text>Số điện thoại: {phone}</Text>
      <Text>Email: {email}</Text>

      {/* Hành khách */}
      <Text style={styles.sectionTitle}>Hành khách</Text>
      {passengerList.map((p: any, index: number) => (
        <Text key={index}>• {p.lastName} {p.firstName} ({p.gender})</Text>
      ))}

      {/* Tổng tiền */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Tổng số tiền</Text>
        <Text style={styles.totalPrice}>{total.toLocaleString("vi-VN")} ₫</Text>
      </View>

      {/* Checkbox điều khoản */}
      <View style={styles.checkboxRow}>
          <TouchableOpacity onPress={() => setAgreeTerms(!agreeTerms)}>
            <Ionicons
              name={agreeTerms ? "checkbox" : "square-outline"}
              size={24}
              color={AppColors.LIGHT_BLUE}
            />
          </TouchableOpacity>
        <Text style={{ marginLeft: 8 }}>
          Tôi đồng ý với{" "}
          <Text style={{ color: AppColors.LIGHT_BLUE }}>Điều khoản sử dụng</Text>
        </Text>
      </View>

      {/* Gửi thông tin */}
      <Text style={styles.infoNote}>
        Vé sẽ được gửi tới email: {email}
      </Text>

      {/* Nút xác nhận */}
      <Pressable
          disabled={loading || !agreeTerms}
          style={[styles.confirmButton, loading && { opacity: 0.6 }]}
          onPress={handleCreateBooking}
      >
          <Text style={styles.confirmText}>
          {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
          </Text>
      </Pressable>
    </ScrollView>

    {loading && (
      <View style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        zIndex: 999
      }}>
        <ActivityIndicator size="large" color={AppColors.LIGHT_BLUE} />
        <Text style={{ marginTop: 8 }}>Đang xử lý thanh toán...</Text>
      </View>
    )}

    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    margin: -20
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: AppColors.LIGHT_BLUE,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
  },
  paymentOption: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  paymentOptionSelected: {
    borderColor: AppColors.LIGHT_BLUE,
    backgroundColor: "#eaf6ff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.LIGHT_BLUE,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  infoNote: {
    color: "gray",
    marginTop: 8,
    fontSize: 13,
  },
  confirmButton: {
    backgroundColor: AppColors.LIGHT_BLUE,
    padding: 14,
    borderRadius: 10,
    marginTop: 30,
  },
  confirmText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PaymentScreen;
