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
    

        const validateEmail = (email: string) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };
    

        const validatePhone = (phone: string) => {
            return /^[0-9]{9,11}$/.test(phone);
        };
    

        const validatePassword = (password: string) => {
            return password.length >= 6;
        };
    

    const handleRegister = async () => {

        let newErrors: { fullname?: string; email?: string; phone?: string; password?: string } = {};

        // Kiểm tra họ tên
        if (!fullname.trim()) {
            newErrors.fullname = "Vui lòng nhập đầy đủ thông tin";
        } else if (fullname.trim().split(" ").length < 2) {
            newErrors.fullname = "Vui lòng nhập ít nhất hai từ";
        }

        // Kiểm tra email
        if (!email.trim()) {
            newErrors.email = "Vui lòng nhập đầy đủ thông tin";
        } else if (!validateEmail(email)) {
            newErrors.email = "Định dạng email không hợp lệ";
        }

        // Kiểm tra số điện thoại
        if (!phone.trim()) {
            newErrors.phone = "Vui lòng nhập đầy đủ thông tin";
        } else if (!validatePhone(phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ 10 chữ số";
        }

        // Kiểm tra mật khẩu
        if (!password.trim()) {
            newErrors.password = "Vui lòng nhập đầy đủ thông tin";
        } else if (!validatePassword(password)) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
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
                        <Text style = {[styles.title]}>Đăng ký ngay</Text>
                        <Text style = {styles.text}>Nhập thông tin của bạn bên dưới</Text>
                    </View>

                    <View style = {styles.infoRegister}>
                        <ShareInput
                            label="Full Name"
                            placeholder="Họ và tên đầy đủ"
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
                            placeholder="Nhập địa chỉ email"
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
                            placeholder="Nhập mật khẩu"
                            onChangeText={(text) =>{
                                setPassword(text);
                                setErrors({...errors, password: ""})
                            }}
                            value={password}
                        />
                        {errors.password ? <Text style={styles.errText}>{errors.password}</Text> : null}

                        <ShareInput
                            label="Mobile Number"
                            placeholder="Nhập số điện thoại"
                            onChangeText={(text) =>{
                                setPhone(text);
                                setErrors({...errors, phone: ""})
                            }}
                            value={phone}
                            keyboadType="phone-pad"
                        />
                        {errors.phone ? <Text style={styles.errText}>{errors.phone}</Text> : null}


                        <ShareButton
                                title="Đăng ký"
                                onPress={handleRegister}
                                pressStyle = {styles.btnStyle}
                                btnStyle ={{justifyContent: "center", alignItems: "center", backgroundColor: AppColors.JAZZBERRY_JAM}}
                                textStyle = {{color: AppColors.WHITE, paddingVertical: 10}}
                        />
                    </View>

        

                    
                    <View style = {styles.login}>

                            <Text style = {{fontSize: 15}}>Bạn đã có tài khoản? </Text>
                            <ShareButton
                                title="Đăng nhập"
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