import authService from "@/apis/authService";
import ShareButton from "@/components/button/button.share";
import { AppColors } from "@/utils/constant";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View, Image, Modal } from "react-native";

const ResetPasswordScreen = () => {
    const params = useLocalSearchParams();
    const email = Array.isArray(params.email) ? params.email[0] : params.email || "";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    // Xử lý đặt lại mật khẩu
    const handleResetPassword = async () => {
        setError("");
        if (!newPassword || !confirmPassword) {
            setError("Please enter your new password.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Reset Password: ", { email, newPassword });
        try {
            const response = await authService.resetPassword({
                email,
                newPassword,
            });
            await minLoadingTime;

            if (response.data === "Password reset successfully") {
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                    router.push("/(auth)/signInScreen");
                }, 2000);
                // router.push("/(auth)/signInScreen"); // Điều hướng về màn hình đăng nhập
            } else {
                setError("Failed to reset password. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter New Password</Text>
            <Text style={styles.subtitle}>Please enter new password</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Password"
                // secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                autoCapitalize="none"
            />
            
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                // secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <ShareButton
                title={loading ? "Saving..." : "Save"}
                onPress={handleResetPassword}
                btnStyle={styles.verifyButton}
            />

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={AppColors.WHITE} />
                </View>
            )}
            <Modal transparent visible={successMessage} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.successText}>Password changed successfully!</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.WHITE,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        color: AppColors.GRAY,
        marginVertical: 10,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderColor: AppColors.BLACK,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    verifyButton: {
        backgroundColor: AppColors.JAZZBERRY_JAM,
        borderRadius: 20,
        paddingHorizontal: 70,
        marginHorizontal: "25%",
        marginTop: 20,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    lockImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        alignItems: "center",
        // marginBottom: 50,
        justifyContent: "center",
    },
    modalContent: {
        backgroundColor: AppColors.WHITE,
        padding: 20,
        borderRadius: 10,
    },
    successText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "red",
    },
});

export default ResetPasswordScreen;
