import authService from "@/apis/authService";
import ShareButton from "@/components/button/button.share";
import ShareInput from "@/components/input/input.share";
import { AppColors } from "@/utils/constant";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPassword = () =>{
    
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const handleForgotPassword = async () =>{
        setErrors("");
        setMessage("");
        if(!email){
            setErrors("Vui lòng nhập địa chỉ email của bạn");
            return;
        }
        if(!validateEmail(email)){
            setErrors("Định dạng email không hợp lệ");
            return;
        }
        setLoading(true);
        const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1500));
        try{   
            const response = await authService.forgotPassword({email});
            await minLoadingTime;
            // console.log("Forgot Password successful: ", response.data);
            
            if(response.data === "OTP has been sent to your email"){
                setMessage("Vui lòng kiểm tra email của bạn để đặt lại mật khẩu");
                setTimeout(() => {
                    setMessage("");
                    router.push({pathname: "/(auth)/verifyOtpScreen", params: {email}});
                }, 2000)

            }
            // else{
            //     setErrors("Email not found. Please try again");
            // }

        }catch(error: any){
            // console.error(error);
            // console.log()
            // setErrors("Failed to send email");
            // console.error("Forgot password error:", error);

            const errorCode = error?.response?.data?.errorCode;
            if (errorCode === "USER_NOT_FOUND") {
              setErrors("Email không tồn tại. Vui lòng nhập lại");
            } else {
              setErrors("Gửi email thất bại. Vui lòng thử lại sau");
            }
        }
        setLoading(false);
    }

    return(
        <View style = {{flex : 1}}>
            <KeyboardAwareScrollView
                contentContainerStyle = {[styles.container, {flexGrow: 1, padding: 20, paddingTop: "40%"}]}
                enableOnAndroid = {true}
                extraHeight = {20}
            >
                <View style ={styles.Box}>
                    <Text style = {styles.title}>Quên mật khẩu</Text>
                    <Text style = {styles.text}>Nhập địa chỉ email của bạn bên dưới để đặt lại mật khẩu</Text>

                    <Text style= {styles.label}>Địa chỉ email</Text>
                    <ShareInput
                            // label="Email Address"
                            placeholder="Vui lòng nhập địa chỉ email của bạn"
                            onChangeText={setEmail}
                            value={email}
                            keyboadType="email-address"
                            style = {{paddingStart: 10, width: "95%"}}
                    />
                    {errors ? <Text style = {styles.errorText}>{errors}</Text> : null}
                    {message ? <Text style = {styles.messageText}>{message}</Text> : null}
                    <ShareButton
                        title="Continue"
                        onPress={handleForgotPassword}
                        pressStyle = {{marginTop: 15, paddingStart: "35%" }}
                        btnStyle = {{backgroundColor: AppColors.JAZZBERRY_JAM, borderRadius: 10}}
                    />
                    
                </View>
            </KeyboardAwareScrollView>
            {loading && 
                    <View style = {styles.loading} pointerEvents="auto">
                        <ActivityIndicator size="large" color={AppColors.WHITE}/>
                    </View>
                }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: AppColors.WHITE,
    },
    title:{
        fontSize: 35,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingStart: 30
    },
    text:{
        fontSize: 20,
        paddingTop: 20,
        opacity: 0.4,
        paddingStart: 30
    },
    Box:{
        borderWidth: 1,
        borderRadius: 20,
        borderColor: AppColors.BLACK,
        padding: 20,
    },
    label:{
        paddingStart: 20,
        opacity: 0.6,
        paddingTop: 20,
        fontWeight: 'bold',
    },
    errorText:{
        color:"red",
        paddingStart: 20,
        paddingTop: 5,
    },
    messageText:{
        color: "green",
        paddingStart: 20,
        paddingTop: 5,
    },
    loading:{
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        elevation: 10,
    }
})

export default ForgotPassword;