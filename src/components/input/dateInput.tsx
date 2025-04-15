import React, { useState } from "react";
import { Platform, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import { AppColors } from "@/utils/constant";

interface Props {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  mode?: "date" | "time" | "datetime";
}

const formatDate = (date: Date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const parseDate = (text: string): Date | null => {
  const [dd, mm, yyyy] = text.split("/");
  if (!dd || !mm || !yyyy) return null;
  const d = new Date(`${yyyy}-${mm}-${dd}`);
  return isNaN(d.getTime()) ? null : d;
};

const autoFormatInput = (text: string): string => {
  const raw = text.replace(/\D/g, "");
  if (raw.length <= 2) return raw;
  if (raw.length <= 4) return `${raw.slice(0, 2)}/${raw.slice(2)}`;
  return `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4, 8)}`;
};

const DateInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  placeholder = "dd/mm/yyyy",
  mode = "date",
}) => {
  const [show, setShow] = useState(false);
  const [textValue, setTextValue] = useState(value ? formatDate(value) : "");

  const handleChangeText = (text: string) => {
    const formatted = autoFormatInput(text);
    setTextValue(formatted);

    if (formatted.length === 10) {
      const parsed = parseDate(formatted);
      if (parsed) {
        onChange(parsed);
      }
    }
  };

  const handleOpenPicker = () => {
    setShow(true);
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios"); // iOS giữ mở, Android auto tắt
    if (selectedDate) {
      onChange(selectedDate);
      setTextValue(formatDate(selectedDate));
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TouchableOpacity onPress={handleOpenPicker}>
          <FontAwesome
            name="calendar"
            size={20}
            color="#999"
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>

        <TextInput
          value={textValue}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType="number-pad"
          style={styles.input}
        />
      </View>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: AppColors.GRAY,
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: AppColors.BLACK,
  },
});

export default DateInput;
