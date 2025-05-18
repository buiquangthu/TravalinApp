import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import DateInput from "@/components/input/dateInput";
import DropdownInput from "@/components/input/dropdownInput";
import { AppColors } from "@/utils/constant";
import { Ionicons } from "@expo/vector-icons";

interface PassengerFormProps {
  index: number;
  label: string;
  onChange: (index: number, data: any) => void;
}

const PassengerForm = ({ index, label, onChange }: PassengerFormProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dob, setDob] = useState<Date | null>(null);
  const [gender, setGender] = useState<string>("Nam");
  const [nationality, setNationality] = useState<string>("");
  const [passportNumber, setPassportNumber] = useState<string>("");
  const [issuingCountry, setIssuingCountry] = useState<string>("");
  const [passportExpiry, setPassportExpiry] = useState<Date | null>(null);
  const [expanded, setExpanded] = useState(true);

  const isAdult = label === "Người lớn";
  const isChild = label === "Trẻ em";
  const isInfant = label === "Em bé";

  // Truyền dữ liệu về parent component mỗi khi form thay đổi
  useEffect(() => {
    onChange(index, {
      firstName,
      lastName,
      dob,
      gender,
      nationality,
      passportNumber,
      issuingCountry,
      passportExpiry,
    });
  }, [
    firstName,
    lastName,
    dob,
    gender,
    nationality,
    passportNumber,
    issuingCountry,
    passportExpiry,
  ]);

  return (


    
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.headerText}>
          Hành khách {index + 1} - {label}
        </Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#fff"
        />
      </Pressable>

      {expanded && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Họ"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Tên đệm và tên"
            value={firstName}
            onChangeText={setFirstName}
          />
          <DateInput label="Ngày sinh" value={dob} onChange={setDob} />

          <Text style={styles.label}>Giới tính</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              onPress={() => setGender("Nam")}
              style={styles.radioOption}
            >
              <View
                style={[
                  styles.radioCircle,
                  gender === "Nam" && styles.selected,
                ]}
              />
              <Text>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender("Nữ")}
              style={styles.radioOption}
            >
              <View
                style={[
                  styles.radioCircle,
                  gender === "Nữ" && styles.selected,
                ]}
              />
              <Text>Nữ</Text>
            </TouchableOpacity>
          </View>

    

          {!isInfant && (
            <DropdownInput
              label="Quốc tịch"
              value={nationality}
              onChange={setNationality}
              options={[
                "Việt Nam", "Mỹ", "Anh", "Pháp", "Nhật Bản", "Hàn Quốc", "Trung Quốc", "Đài Loan", "Singapore", "Malaysia", "Thái Lan", "Indonesia", "Philippines", "Úc", "Canada", "New Zealand", "Ấn Độ", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Bhutan", "Maldives"
              ]}
            />
          )}


          {nationality !== "Việt Nam" && isAdult && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Số hộ chiếu"
                value={passportNumber}
                onChangeText={setPassportNumber}
              />
              <DropdownInput
                label="Quốc gia cấp"
                value={issuingCountry}
                onChange={setIssuingCountry}
                options={[
                  "Việt Nam", "Mỹ", "Anh", "Pháp", "Nhật Bản", "Hàn Quốc", "Trung Quốc", "Đài Loan", "Singapore", "Malaysia", "Thái Lan", "Indonesia", "Philippines", "Úc", "Canada", "New Zealand", "Ấn Độ", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Bhutan", "Maldives"
                ]}
              />
              <DateInput
                label="Ngày hết hạn"
                value={passportExpiry}
                onChange={setPassportExpiry}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: AppColors.LIGHT_BLUE,
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
  },
  header: {
    backgroundColor: AppColors.LIGHT_BLUE,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 16,
  },
  label: {
    marginTop: 10,
    fontWeight: "600",
    marginHorizontal: 16,
  },
  genderRow: {
    flexDirection: "row",
    marginVertical: 6,
    marginHorizontal: 16,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 6,
  },
  selected: {
    backgroundColor: AppColors.JAZZBERRY_JAM,
  },
});

export default PassengerForm;
