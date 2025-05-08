import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import ScreenContainer from "@/components/layout/screenContainer";
import { AppColors } from "@/utils/constant";
import authService from "@/apis/authService";
import { useRouter } from "expo-router";

const ChangePasswordScreen = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới không khớp.");
      return;
    }

    try {
      await authService.changePassword({ currentPassword, newPassword });
      Alert.alert("Thành công", "Mật khẩu đã được thay đổi.");
      router.back();
    } catch (error: any) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      Alert.alert("Lỗi", error?.response?.data?.message || "Đã xảy ra lỗi.");
    }
  };

  return (
    <ScreenContainer title="Thay đổi mật khẩu">
      <View style={styles.container}>
        <Text style={styles.label}>Mật khẩu hiện tại</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <Text style={styles.label}>Mật khẩu mới</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Pressable style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: AppColors.LIGHT_BLUE,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChangePasswordScreen;
