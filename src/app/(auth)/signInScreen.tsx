import ShareInput from "@/components/input/input.share";
import { AppColors } from "@/utils/constant";
import React, { useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ShareButton from "@/components/button/button.share";
import { Facebook, Google } from "@/assets/svgs";

const SignInScreen = () => {
    const [email, setEmail] = useState("");

    return(
  

        <SafeAreaView style = {{flex: 1}}>
            <View style = {styles.container}>

                <View style = {[styles.logo]}>
                    <Image source = {require("../../assets/logoFly.png")}/>
                    <Text style = {[styles.title]}>Let's get you Login!</Text>
                    <Text style = {styles.text}>Enter your information below</Text>
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

            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: AppColors.WHITE
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
        justifyContent: "space-around"
    },
    btnStyle:{
        backgroundColor: AppColors.WHITE,
        borderWidth: 1,
        borderColor: AppColors.GRAY,
        paddingHorizontal: 45,
        paddingVertical: 13,
    }
})

export default SignInScreen;