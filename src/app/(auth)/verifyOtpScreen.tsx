import authService from "@/apis/authService";
import ShareButton from "@/components/button/button.share";
import { AppColors } from "@/utils/constant";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";

const VerifyOtpScreen = () => {
    const params = useLocalSearchParams();
    const email = Array.isArray(params.email) ? params.email[0] : params.email || "";
    // console.log("Received email:", email);

    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<(TextInput | null)[]>([]);

    const handleChange = (text: string,index: number) => {
        if (/^\d?$/.test(text)) {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);
            if (text && index < 4) inputRefs.current[index + 1]?.focus();
            if (!text && index > 0) inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        setError("");
        
        const otpCode = otp.join("");

        if (otpCode.length !== 5) {
            setError("OTP phải có 5 số.");
            return;
        }
        
        setLoading(true);
        try {
            // console.log("Send OTP: ", {email, otp: otpCode})
            const response = await authService.verifyOtp({
                email,
                otp: otpCode,
            });
            if (response.data === "OTP verified successfully. You can now reset your password") {
                // router.push("/(auth)/resetPasswordScreen");
                router.push({pathname: "/(auth)/resetPasswordScreen", params: {email}});
            } else {
                setError("OTP không hợp lệ. Vui lòng thử lại.");
            }
        } catch (error) {
            setError("Mã OTP của bạn đã hết hạn. Vui lòng thử lại.");
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vui lòng nhập OTP Code</Text>
            <Text style={styles.subtitle}>Mã OTP đã được gửi đến email "{email}"</Text>
            
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={styles.otpInput}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <ShareButton
                title={loading ? "Verifying..." : "Verify"}
                onPress={handleVerifyOtp}
                btnStyle={styles.verifyButton}
            />

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={AppColors.WHITE} />
                </View>
            )}
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
    otpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 20,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: "center",
        fontSize: 20,
        marginHorizontal: 5,
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
});

export default VerifyOtpScreen;
