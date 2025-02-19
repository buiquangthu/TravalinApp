import { ImageBackground, Text, View, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native"
import ShareButton from "@/components/button/button.share";
import { AppColors } from "@/utils/constant";

import { Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const RootPage = () =>{
    const router = useRouter();
    useEffect(() =>{
        setTimeout(async() =>{
            await SplashScreen.hideAsync();
            router.replace("/(auth)/onboardingScreen")
        }, 2000)
    },[]);

    // if(true){
    //     return(
    //         <Redirect href={"/(auth)/signInScreen"}/>
    //     )
    // }

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