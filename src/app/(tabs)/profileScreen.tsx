import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { AppColors } from "@/utils/constant";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "@/apis/authService";


const ProfileScreen = () => {
  const router = useRouter();

  const [fullname, setFullname] = useState("Tim");
  const [email, setEmail] = useState("")

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await authService.getProfile();
        setFullname(response.data.fullname);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, [])


  const handleLogout = async () => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("accessToken");
            router.replace("/(auth)/signInScreen"); // Điều hướng về login
          } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
            Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.");
          }
        },
      },
    ]);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/101" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{fullname}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <View style={styles.styleOption}>
        <Pressable style={styles.option} onPress={() => { router.push("/changePasswordScreen") }}>
          <Ionicons name="create-outline" size={20} style={styles.icon} />
          <Text style={styles.optionText}>Thay đổi mật khẩu</Text>
        </Pressable>

        <Pressable style={styles.option} onPress={() => { }}>
          <FontAwesome5 name="ticket-alt" size={18} style={styles.icon} />
          <Text style={styles.optionText}>Phiếu giảm giá</Text>
        </Pressable>

        <Pressable style={styles.option} onPress={() => { }}>
          <FontAwesome5 name="credit-card" size={18} style={styles.icon} />
          <Text style={styles.optionText}>Phương thức thanh toán</Text>
        </Pressable>

        <Pressable style={styles.option} onPress={() => { router.replace("/(tabs)/orderHistoryScreen") }}>
          <Ionicons name="airplane-outline" size={20} style={styles.icon} />
          <Text style={styles.optionText}>Vé của tôi</Text>
        </Pressable>

        <Pressable style={styles.option}
          onPress={() => Linking.openURL("https://www.traveloka.com/vi-vn/privacy-notice")}
        >
          <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
          <Text style={styles.optionText}>Chính sách bảo mật</Text>
        </Pressable>

        <Pressable style={styles.option} onPress={() => Linking.openURL("https://www.traveloka.com/vi-vn/promotion/hotel-tnc")}>
          <MaterialIcons name="description" size={20} style={styles.icon} />
          <Text style={styles.optionText}>Điều khoản sử dụng</Text>
        </Pressable>

        {/* Logout */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  header: {
    backgroundColor: AppColors.LIGHT_BLUE,
    padding: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 70,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "#f0f0f0",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    color: AppColors.BLACK,
  },
  icon: {
    color: AppColors.LIGHT_BLUE,
  },
  logoutButton: {
    backgroundColor: AppColors.LIGHT_BLUE,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  styleOption: {
    padding: 16,
    backgroundColor: "#fff",
  }
});

export default ProfileScreen;
