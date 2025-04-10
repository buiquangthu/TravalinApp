import { ImageBackground, Text, View, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native"
import ShareButton from "@/components/button/button.share";
import { AppColors } from "@/utils/constant";
import { jwtDecode } from "jwt-decode";
import { Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

interface TokenPayload{
    exp: number;
    [key: string]: any;
}

const RootPage = () =>{
    const router = useRouter();

    useEffect(() => {
        const initializeApp = async () => {
          try {
            const token = await AsyncStorage.getItem("accessToken");
    
            if (token) {
              try {
                const decoded: TokenPayload = jwtDecode(token);
                const now = Date.now() / 1000;
                if (decoded.exp > now) {
                  // Token còn hạn
                  router.replace("/(tabs)");
                  return;
                } else {
                  console.log("Token hết hạn");
                }
              } catch (err) {
                console.log("Không thể decode token");
              }
            }
    
            // Nếu không có token hoặc token không hợp lệ
            router.replace("/(auth)/onboardingScreen");
          } catch (error) {
            console.error("Lỗi khi khởi tạo ứng dụng:", error);
            router.replace("/(auth)/onboardingScreen");
          } finally {
            await SplashScreen.hideAsync();
          }
        };
            // Giả lập splash trong 2s rồi check token
            setTimeout(initializeApp, 2000);
        }, []);    

    return(
        <View style = {styles.container}>
            <View style = {styles.logo}>
                <Image source={require('../assets/Logo.png')}/>
                <Text style = {styles.text}>Your Passport to Seamless Adventures!</Text>
            </View>
            <View style = {{height: 30}}/>
            <ActivityIndicator size="large" color={AppColors.WHITE}/>
            

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: AppColors.TEAL_BLUE
    },
    logo:{
        alignItems: 'center',
        paddingTop: "85%"
        
    },
    card:{
        marginTop: "85%",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#000',
        height: "50%",
        backgroundColor: "#F6F6F6"
    },
    text:{
        fontSize: 14,
        color: AppColors.WHITE,
        fontFamily: 'Regular'
    }
})

export default RootPage;