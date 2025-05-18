import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppColors } from "@/utils/constant";
import PassengerForm from "@/components/layout/passengerFormProps";
import ScreenContainer from "@/components/layout/screenContainer";

const CustomerInfoScreen = () => {
  const router = useRouter();

  const [contactErrors, setContactErrors] = useState({
    contactLastName: false,
    contactName: false,
    phone: false,
    email: false,
  });

  const { passengers, price, flightId, totalPrice } = useLocalSearchParams();

  const pricePerPassenger = Number(price) || 0;

  const parsedPassengers = passengers ? JSON.parse(passengers as string) : { adult: 1, child: 0, baby: 0 };


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


    // Validate hành khách
    for (let i = 0; i < passengerData.length; i++) {
      const p = passengerData[i];
      if (!p.firstName || !p.lastName || !p.dob) {
        Alert.alert("Thông báo", `Vui lòng nhập đầy đủ họ tên và ngày sinh`);
        return;
      }

      const isAdult = passengerList[i] === "Người lớn";
      const isForeign = p.nationality && p.nationality !== "Việt Nam";

      if (isAdult && isForeign) {
        if (!p.passportNumber || !p.issuingCountry || !p.passportExpiry) {
          Alert.alert("Thông báo", `Vui lòng nhập đầy đủ thông tin hộ chiếu`);
          return;
        }
      }
    }

    const newErrors = {
      contactLastName: !contactLastName,
      contactName: !contactName,
      phone: !phone,
      email: !email,
    };

    setContactErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin liên hệ.");
      return;
    }

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
          style={[
            styles.input,
            contactErrors.contactLastName && { borderColor: "red" },
          ]}
          placeholder="Họ"
          value={contactLastName}
          onChangeText={(text) => {
            setContactLastName(text);
            if (text) setContactErrors((prev) => ({ ...prev, contactLastName: false }));
          }}
        />
        <TextInput
          style={[
            styles.input,
            contactErrors.contactLastName && { borderColor: "red" },
          ]}
          placeholder="Tên đệm và tên"
          value={contactName}
          onChangeText={(text) => {
            setContactName(text);
            if (text) setContactErrors((prev) => ({ ...prev, contactLastName: false }));
          }}
        />
        <TextInput
          style={[
            styles.input,
            contactErrors.contactLastName && { borderColor: "red" },
          ]}
          placeholder="Số điện thoại liên hệ"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            if (text) setContactErrors((prev) => ({ ...prev, contactLastName: false }));
          }}
        />
        <TextInput
          style={[
            styles.input,
            contactErrors.contactLastName && { borderColor: "red" },
          ]}
          placeholder="Nhập email nhận thông tin vé"
          keyboardType="email-address"
          value={email}
          autoCapitalize="none"

          onChangeText={(text) => {
            setEmail(text);
            if (text) setContactErrors((prev) => ({ ...prev, contactLastName: false }));
          }}
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
