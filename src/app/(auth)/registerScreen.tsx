import authService from "@/apis/authService";
import ShareButton from "@/components/button/button.share";
import ShareInput from "@/components/input/input.share";
import { AppColors } from "@/utils/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RegisterScreen = () => {

    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ fullname?: string; email?: string; phone?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);
    
        // Hàm kiểm tra email hợp lệ
        const validateEmail = (email: string) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };
    
        // Hàm kiểm tra số điện thoại hợp lệ (chỉ chứa số, độ dài 9-11 số)
        const validatePhone = (phone: string) => {
            return /^[0-9]{9,11}$/.test(phone);
        };
    
        // Hàm kiểm tra mật khẩu hợp lệ (tối thiểu 6 ký tự)
        const validatePassword = (password: string) => {
            return password.length >= 6;
        };
    

    const handleRegister = async () => {

        let newErrors: { fullname?: string; email?: string; phone?: string; password?: string } = {};

        // Kiểm tra họ tên
        if (!fullname.trim()) {
            newErrors.fullname = "Full name is required";
        } else if (fullname.trim().split(" ").length < 2) {
            newErrors.fullname = "Please enter at least two words";
        }

        // Kiểm tra email
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Invalid email format";
        }

        // Kiểm tra số điện thoại
        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!validatePhone(phone)) {
            newErrors.phone = "Invalid phone number (9-11 digits)";
        }

        // Kiểm tra mật khẩu
        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (!validatePassword(password)) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // Nếu có lỗi, hiển thị lỗi và dừng đăng ký
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Nếu không có lỗi, thực hiện đăng ký
        setLoading(true);
        const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1500));
        try {
          const response = await authService.register({ fullname, email, password, phone });
          await minLoadingTime;
          setLoading(false);
          console.log("Register successful: ", response.data);

          await AsyncStorage.setItem('registerSuccessMessage', "Register successful. Please login to continue.");
          
          router.navigate("/(auth)/signInScreen")
        } catch (error) {
            await minLoadingTime;
            console.error('Registration failed:', error);
        }
      }

    return(

            <KeyboardAwareScrollView 
                contentContainerStyle ={{flexGrow: 1}}
                enableOnAndroid = {true}
                extraHeight={20}
                style = {[styles.container]}
                >
                <View>
                    <View style = {[styles.logo]}>
                        <Image source = {require("../../assets/logoFly.png")}/>
                        <Text style = {[styles.title]}>Register Now</Text>
                        <Text style = {styles.text}>Enter your information below</Text>
                    </View>

                    <View style = {styles.infoRegister}>
                        <ShareInput
                            label="Full Name"
                            placeholder="Enter Fullname"
                            onChangeText={(text) =>{
                                setFullName(text);
                                setErrors({...errors, fullname: ""})
                            }
                            }
                            value={fullname}
                        />
                        {errors.fullname ? <Text style={styles.errText}>{errors.fullname}</Text> : null}

                        <ShareInput
                            label="Email Address"
                            placeholder="Enter Email"
                            onChangeText={(text) =>{
                                setEmail(text);
                                setErrors({...errors, email: ""})
                            }}
                            value={email}
                            keyboadType="email-address"
                        />
                        {errors.email ? <Text style={styles.errText}>{errors.email}</Text> : null}

                        <ShareInput
                            label="Password"
                            placeholder="Enter password"
                            onChangeText={(text) =>{
                                setPassword(text);
                                setErrors({...errors, password: ""})
                            }}
                            value={password}
                        />
                        {errors.password ? <Text style={styles.errText}>{errors.password}</Text> : null}

                        <ShareInput
                            label="Mobile Number"
                            placeholder="Enter Mobile Number"
                            onChangeText={(text) =>{
                                setPhone(text);
                                setErrors({...errors, phone: ""})
                            }}
                            value={phone}
                            keyboadType="phone-pad"
                        />
                        {errors.phone ? <Text style={styles.errText}>{errors.phone}</Text> : null}


                        <ShareButton
                                title="Register"
                                onPress={handleRegister}
                                pressStyle = {styles.btnStyle}
                                btnStyle ={{justifyContent: "center", alignItems: "center", backgroundColor: AppColors.JAZZBERRY_JAM}}
                                textStyle = {{color: AppColors.WHITE, paddingVertical: 10}}
                        />
                    </View>

        

                    
                    <View style = {styles.login}>

                            <Text style = {{fontSize: 15}}>Already a member? </Text>
                            <ShareButton
                                title="Login"
                                tpye="link"
                                onPress={() => router.navigate("/(auth)/signInScreen")}
                                textStyle = {{fontSize: 15}}
                            />
                    </View>
                </View>
                {loading && 
                    <View style = {styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={AppColors.WHITE}/>
                    </View>
                }
            </KeyboardAwareScrollView>
        
    )

};
const styles = StyleSheet.create({
    container:{
        backgroundColor: AppColors.WHITE,
    },
    logo:{
        alignItems: 'flex-start',
        paddingVertical: 50,
        paddingHorizontal: "5%"
    },

    title:{
        fontSize: 40,
        fontWeight: 'bold',
        paddingTop: 25,
    },
    text:{
        fontSize: 20,
        paddingTop: 15,
        opacity: 0.4
    },
    infoRegister:{

    },
    btnStyle:{
        marginTop: 30,
        alignSelf: "stretch",
        paddingHorizontal: "3%",
        paddingBottom: 15,
    },
    login:{
        flexDirection: "row",
        justifyContent: "center",    
    },
    loadingOverlay:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    errText:{
        color: "red",
        fontSize: 14,
        marginLeft: "7%",
        marginTop: 5,
    }
});

export default RegisterScreen;