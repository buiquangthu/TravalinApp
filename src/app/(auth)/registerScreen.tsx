import authService from "@/apis/authService";
import ShareButton from "@/components/button/button.share";
import ShareInput from "@/components/input/input.share";
import { AppColors } from "@/utils/constant";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RegisterScreen = () => {

    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    

    const handleRegister = async () => {
        try {
          const response = await authService.register({ fullname, email, password, phone });
          console.log("Register successful: ", response.data)
        } catch (error) {
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
                <View style = {[styles.logo]}>
                    <Image source = {require("../../assets/logoFly.png")}/>
                    <Text style = {[styles.title]}>Register Now</Text>
                    <Text style = {styles.text}>Enter your information below</Text>
                </View>

                <View style = {styles.infoRegister}>
                    <ShareInput
                        label="Name"
                        placeholder="Enter Fullname"
                        onChangeText={setFullName}
                        value={fullname}
                    />

                    <ShareInput
                        label="Email Address"
                        placeholder="Enter Email"
                        onChangeText={setEmail}
                        value={email}
                        keyboadType="email-address"
                    />

                    <ShareInput
                        label="Password"
                        placeholder="Enter password"
                        onChangeText={setPassword}
                        value={password}
                        
                    />

                    <ShareInput
                        label="Mobile Number"
                        placeholder="Enter Mobile Number"
                        onChangeText={setPhone}
                        value={phone}
                        keyboadType="phone-pad"
                    />

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
    }


});

export default RegisterScreen;