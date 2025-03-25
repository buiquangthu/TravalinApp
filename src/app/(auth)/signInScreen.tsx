import ShareInput from "@/components/input/input.share";
import { AppColors } from "@/utils/constant";
import React, { useState } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ShareButton from "@/components/button/button.share";
import { Facebook, Google } from "@/assets/svgs";
import TextBetweenLine from "@/components/button/text.between.line";
import { router } from "expo-router";

const SignInScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    return(
        <SafeAreaView style = {styles.container}>
            <ScrollView>
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

                <View style = {styles.textLoginWith}>
                        <TextBetweenLine title="Or login with" textColor="black"/>
                </View>
            <View style = {styles.info}>
                    <ShareInput
                        label="Email Address"
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                        icon = {<Ionicons name="mail" size={20} style ={{opacity: 0.3}}/>}
                        style ={[{marginRight: "7%"}]}
                    />

                    <ShareInput
                        label="Password"
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={setPassword}
                        icon = {<Ionicons name="lock-closed" size={20} style ={{opacity: 0.3}}/>}
                        style ={{marginRight: "7%"}}
                        secureTextEntry
                    />

                    <ShareButton 
                        title="Forgot Password?"
                        onPress={() =>{}}
                        tpye="link"
                        textStyle = {styles.forgotPassword}
                    />

                    <ShareButton 
                        title="Login"
                        onPress={()=>{}}
                        pressStyle ={styles.login}
                        btnStyle ={{justifyContent: "center", alignItems: "center", backgroundColor: AppColors.JAZZBERRY_JAM}}
                        textStyle = {{paddingVertical: 5}}
                    />
                   
                </View>
                <View style = {styles.register}>
                    <Text style = {{fontSize: 15}}>Don't have an account? </Text>
                    <ShareButton
                        title="Register Now"
                        tpye="link"
                        onPress={() => router.navigate("/(auth)/registerScreen")}
                        textStyle = {{fontSize: 15}}
                    />
                </View>


            </ScrollView>

                
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
        
    }
})

export default SignInScreen;