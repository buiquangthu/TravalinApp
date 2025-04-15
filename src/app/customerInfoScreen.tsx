import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppColors } from "@/utils/constant";
import PassengerForm from "@/components/layout/passengerFormProps";

const CustomerInfoScreen = () => {
  const router = useRouter();
  const { passengers, price } = useLocalSearchParams();
  const numPassengers = Number(passengers) || 1;
  const pricePerPassenger = Number(price) || 0;
  const totalPrice = numPassengers * pricePerPassenger;

  const [contactName, setContactName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Thông tin hành khách</Text>

      {[...Array(numPassengers)].map((_, index) => (
        <PassengerForm key={index} index={index} label="Hành khách" />
      ))}

      <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>

      <TextInput
        style={styles.input}
        placeholder="Họ"
        value={contactLastName}
        onChangeText={setContactLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên đệm và tên"
        value={contactName}
        onChangeText={setContactName}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Tổng số tiền</Text>
        <Text style={styles.totalPrice}>{totalPrice.toLocaleString("vi-VN")} ₫</Text>
      </View>

      <Pressable style={styles.continueButton}
        onPress={() => {
          router.push({
            pathname: "/paymentScreen",
            params: {
              price: totalPrice,
              passengers: passengers,
              contactName: contactName,
              contactLastName: contactLastName,
              phone: phone,
              email: email,
            },
          });
        }}
      >
        <Text style={styles.continueText}>Tiếp tục</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: AppColors.LIGHT_BLUE,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
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
  continueButton: {
    backgroundColor: AppColors.LIGHT_BLUE,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomerInfoScreen;
