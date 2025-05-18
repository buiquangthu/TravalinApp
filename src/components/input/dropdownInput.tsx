import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AppColors } from "@/utils/constant";

interface Props {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  icon?: React.ReactNode;
}

const DropdownInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Chọn",
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item: string) => {
    onChange(item);
    setVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable style={styles.inputBox} onPress={() => setVisible(true)}>
        <Text style={[styles.inputText, !value && { color: "#aaa" }]}>
          {value || placeholder}
        </Text>
        <FontAwesome name="chevron-down" size={16} color="#666" />
      </Pressable>

      <Modal transparent visible={visible} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalBox}>
            <ScrollView>
              {options.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* <Modal transparent visible={visible} animationType="fade">
        <ScrollView>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalBox}>
            {options.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
        </ScrollView>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: AppColors.GRAY,
    marginBottom: 4,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  inputText: {
    fontSize: 16,
    color: AppColors.BLACK,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalBox: {
    backgroundColor: "#fff",
    marginHorizontal: 40,
    borderRadius: 10,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
  },
});

export default DropdownInput;
