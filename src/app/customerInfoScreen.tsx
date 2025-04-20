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
import ScreenContainer from "@/components/layout/screenContainer";

const CustomerInfoScreen = () => {
  const router = useRouter();
  const { passengers, price, flightId, totalPrice} = useLocalSearchParams();
  // const numPassengers = Number(passengers) || 1;
  const pricePerPassenger = Number(price) || 0;
  // const totalPrice = numPassengers * pricePerPassenger;
  const parsedPassengers = passengers ? JSON.parse(passengers as string) : { adult: 1, child: 0, baby: 0 };

  const numPassengers =
  (parsedPassengers.adult) +
  (parsedPassengers.child) +
  (parsedPassengers.baby);

  // const [passengerData, setPassengerData] = useState(
  //   Array(numPassengers).fill({
  //     firstName: "",
  //     lastName: "",
  //     dob: null,
  //     gender: "Nam",
  //     nationality: "",
  //     passportNumber: "",
  //     issuingCountry: "",
  //     passportExpiry: null,
  //   })
  // );

  // Parse passengers

const passengerList = [
  ...Array(parsedPassengers.adult).fill("Người lớn"),
  ...Array(parsedPassengers.child).fill("Trẻ em"),
  ...Array(parsedPassengers.baby).fill("Em bé"),
];

// Khởi tạo state dựa trên số lượng hành khách
const [passengerData, setPassengerData] = useState(
  passengerList.map(() => ({
    firstName: "",
    lastName: "",
    dob: null,
    gender: "Nam",
    nationality: "",
    passportNumber: "",
    issuingCountry: "",
    passportExpiry: null,
  }))
);


  const formatCurrency = (num: number) =>
    num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";

  const handlePassengerChange = (index: number, data: any) => {
    const updated = [...passengerData];
    updated[index] = data;
    setPassengerData(updated);
  };

  const [contactName, setContactName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    //có thể thêm validate ở đây nếu cần
    router.push({
      pathname: "/paymentScreen",
      params: {
        price: totalPrice,
        passengers: JSON.stringify(passengerData),
        contactName,
        contactLastName,
        phone,
        email,
        flightId
      },
    });
  };

  return (
    <ScreenContainer title="Thông tin khách hàng">
      <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.sectionTitle}>Thông tin hành khách</Text> */}

      {/* {passengerData.map((_, index) => (
        <PassengerForm
          key={index}
          index={index}
          label={`Điền thông tin`}
          onChange={handlePassengerChange}
        />
      ))} */}

      {passengerList.map((type, index) => (
        <PassengerForm
          key={index}
          index={index}
          label={type}
          onChange={handlePassengerChange}
        />
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
        <Text style={styles.totalPrice}>{formatCurrency(Number(totalPrice))}</Text>
      </View>

      <Pressable style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Tiếp tục</Text>
      </Pressable>
    </ScrollView>
    </ScreenContainer>
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
