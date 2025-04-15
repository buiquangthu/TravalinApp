import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";

interface Airport {
  code: string;
  location: string;
  display: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (airport: Airport) => void;
  recentSearches: Airport[];
  airportList: Airport[];
  title?: string;
}

const AirportSelectorModal: React.FC<Props> = ({
  visible,
  onClose,
  onSelect,
  recentSearches,
  airportList,
  title = "Chọn sân bay",
}) => {
  const [keyword, setKeyword] = useState("");

  const filteredAirports = airportList.filter(
    (a) =>
      a.display.toLowerCase().includes(keyword.toLowerCase()) ||
      a.location.toLowerCase().includes(keyword.toLowerCase())
  );

  const renderItem = ({ item }: { item: Airport }) => (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      style={styles.item}
    >
      <Text style={styles.code}>{item.display}</Text>
      <Text style={styles.location}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <TextInput
            placeholder="Tìm mã hoặc tên tỉnh/thành phố..."
            style={styles.searchBox}
            value={keyword}
            onChangeText={setKeyword}
          />

          {recentSearches.length > 0 && (
            <>
              <Text style={styles.section}>Tìm kiếm gần đây</Text>
              {recentSearches.map((airport, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.item}
                  onPress={() => onSelect(airport)}
                >
                  <Text style={styles.code}>{airport.display}</Text>
                  <Text style={styles.location}>{airport.location}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          <Text style={styles.section}>Danh sách sân bay</Text>
          <FlatList
            data={filteredAirports}
            keyExtractor={(item) => item.code}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#fff",
    maxHeight: "90%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  close: {
    fontSize: 22,
    color: "#666",
  },
  searchBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 12,
  },
  section: {
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  item: {
    paddingVertical: 4,
    borderBottomWidth: 0.9,
    borderColor: "#eee",
  },
  code: {
    fontSize: 16,
    fontWeight: "500",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
});

export default AirportSelectorModal;
