import ShareInput from "@/components/input/input.share";
import { AppColors } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ShareButton from "@/components/button/button.share";
import { Facebook, Google } from "@/assets/svgs";
import TextBetweenLine from "@/components/button/text.between.line";
import { router } from "expo-router";
import authService from "@/apis/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{email?: string; password?: string; notExits?:string}>({});
    const [registerMessage, setRegisterMessage] = useState("");
    const [errorslogin, setErrorslogin] = useState("");
    

    const handleLogin = async () => {
        let newErrors:{email?: string; password?: string, notExits?:string} = {};
        setErrorslogin("");

        if(!email) newErrors.email = "Vui lòng nhập email";
        if(!password) newErrors.password = "Vui lòng nhập mật khẩu";


        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1500));
        try {
          const response = await authService.login({ email, password });
          console.log('Login successful:', response.data);

          const token = response.data.accessToken;

          if(!token){
            console.log("No token received");
            return;
          }

          await AsyncStorage.setItem('accessToken', token); // luu token vao async storage

          await minLoadingTime;
          setLoading(false);
          router.replace("/(tabs)");
        }catch (error: any) {
            await minLoadingTime;
            setLoading(false);
            let apiErrors: { email?: string; password?: string } = {};
    
            const errorData = error?.response?.data;

            if (errorData?.errorCode === "VALIDATION_ERROR") {
                apiErrors.email =  "Email không hợp lệ";
              } else if (error?.response?.status === 403 || error?.response?.status === 404) {
                setErrorslogin("Tài khoản hoặc mật khẩu không chính xác");
              } else if (error.request) {
                apiErrors.email = "Không kết nối được với máy chủ";
              }
            setErrors(apiErrors);
        }
      };
    return(
        <SafeAreaView style = {styles.container}>
            <ScrollView>
                <View>
                    <View style = {[styles.logo]}>
                            <Image source = {require("../../assets/logoFly.png")}/>
                            <Text style = {[styles.title]}>Hãy cùng đăng nhập nhé!</Text>
                            <Text style = {styles.text}>Nhập thông tin của bạn bên dưới</Text>
                        </View>
                        
                        <View style = {[styles.loginWith]}>
                            <ShareButton 
                                title="Google"
                                onPress={()=>{}}
                                btnStyle ={styles.btnStyle}
                                textStyle = {{color: AppColors.BLACK}}
                                icon = {<Google/>}
                            />

                            <ShareButton 
                                title="Facebook"
                                onPress={()=>{}}
                                btnStyle ={styles.btnStyle}
                                textStyle = {{color: AppColors.BLACK}}
                                icon = {<Facebook/>}
                            />
                        </View>

                        <View style = {styles.textLoginWith}>
                                <TextBetweenLine title="Or login with" textColor="black"/>
                        </View>
                    <View style = {styles.info}>
                            <ShareInput
                                label="Email Address"
                                placeholder="Nhập email của bạn"
                                value={email}
                                
                                keyboadType="email-address"
                                onChangeText={
                                    (text) =>{
                                        setEmail(text);
                                        setErrors({...errors, email: ""})
                                    }
                                }
                                icon = {<Ionicons name="mail" size={20} style ={{opacity: 0.3}}/>}
                                style ={[{marginRight: "7%"}]}
                            />
                            {errors.email ? <Text style = {styles.errText}>{errors.email}</Text> : null}

                            <ShareInput
                                label="Password"
                                placeholder="Nhập mật khẩu của bạn"
                                value={password}
                                onChangeText={
                                    (text) =>{
                                        setPassword(text);
                                        setErrors({...errors, password: ""})
                                    }
                                }
                                icon = {<Ionicons name="lock-closed" size={20} style ={{opacity: 0.3}}/>}
                                style ={{marginRight: "7%"}}
                                secureTextEntry
                            />
                            {errors.password ? <Text style = {styles.errText}>{errors.password}</Text> : null}
                            { errorslogin ? <Text style = {styles.errTextLogin}>{errorslogin}</Text> : null}
                            <ShareButton 
                                title="Quên mật khẩu?"
                                onPress={() => router.navigate("/(auth)/forgotPasswordScreen")}
                                tpye="link"

                                textStyle = {styles.forgotPassword}
                            />
                           
                            <ShareButton 
                                title="Đăng nhập"
                                onPress={handleLogin}
                                pressStyle ={styles.login}
                                btnStyle ={{justifyContent: "center", alignItems: "center", backgroundColor: AppColors.JAZZBERRY_JAM}}
                                textStyle = {{paddingVertical: 10}}
                            />
                        
                        </View>
                        <View style = {styles.register}>
                            <Text style = {{fontSize: 15}}>Bạn chưa có tài khoản?  </Text>
                            <ShareButton
                                title="Đăng ký"
                                tpye="link"
                                onPress={() => router.navigate("/(auth)/registerScreen")}
                                textStyle = {{fontSize: 15}}
                            />
                        </View>
                </View>

                    {registerMessage != "" && (
                        <Text style = {styles.successMessage}>
                            {registerMessage}
                        </Text>
                    )}
            </ScrollView>
            {loading && 
                <View style = {styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={AppColors.WHITE}/>
                </View>    
            }
                
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: AppColors.WHITE,
        flex: 1
    },
    signin:{
        backgroundColor: AppColors.WHITE,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "red",
        marginTop: "45%",
        marginHorizontal: "5%",
        height: "60%"
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        paddingTop: 25,
    },
    text:{
        fontSize: 20,
        paddingTop: 15,
        opacity: 0.3

    },
    logo:{
        alignItems: 'flex-start',
        paddingVertical: 50,
        paddingHorizontal: "5%"
    },
    loginWith:{
        flexDirection: "row",
        justifyContent: "space-around",
        // borderWidth: 1,
        // borderColor: AppColors.GRAY,
        paddingHorizontal: "5%",
        gap: 10,
    },
    btnStyle:{
        backgroundColor: AppColors.WHITE,
        borderWidth: 1,
        borderColor: AppColors.GRAY,
        paddingHorizontal: "10%",
        paddingVertical: 13,
        

    },
    textLoginWith:{
        marginTop: 20,
    },
    info:{
        paddingTop: 40,
        paddingVertical: 20,
        flex: 1
    },
    forgotPassword:{
        alignSelf: "flex-end",
        marginRight: "7%",
        fontSize: 15
    },
    login:{
        alignSelf: "stretch",
        paddingHorizontal: "3%",
        marginTop: 30
    },
    register:{
        flexDirection: "row",
        justifyContent: "center",
        // bottom: "5%"
        
    },
    errText:{
        color: "red",
        fontSize: 15,
        marginLeft: "7%",
        marginTop: 5,
    },
    errTextLogin:{
        color: "red",
        fontSize: 15,
        marginLeft: "7%",
        marginTop: 5,
        textAlign: "center",
        paddingVertical: 10,
    },
    loadingOverlay:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    successMessage:{
        textAlign: "center",
        color: "green",
        fontSize: 16,
        marginTop: 10
    }
})

export default SignInScreen;