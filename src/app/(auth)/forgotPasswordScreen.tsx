import authService from "@/apis/authService";
import ShareButton from "@/components/button/button.share";
import ShareInput from "@/components/input/input.share";
import { AppColors } from "@/utils/constant";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPassword = () =>{

    const [email, setEmail] = useState("");

    const handleForgotPassword = async () =>{
        try{   
            const response = await authService.forgotPassword({email});
            console.log("Forgot Password successful: ", response.data); 
        }catch(error){
            console.error(error);
        }
    }

    return(
        <KeyboardAwareScrollView
            contentContainerStyle = {[styles.container, {flexGrow: 1, padding: 20, paddingTop: "40%"}]}
            enableOnAndroid = {true}
            extraHeight = {20}
            

        >
            <View style ={styles.Box}>
                <Text style = {styles.title}>Forgot Password</Text>
                <Text style = {styles.text}>Enter your email address below to reset your password</Text>

                <Text style= {styles.label}>Email Address</Text>
                <ShareInput
                        // label="Email Address"
                        placeholder="Enter Email"
                        onChangeText={setEmail}
                        value={email}
                        keyboadType="email-address"
                        style = {{paddingStart: 10, width: "95%"}}
                />

                <ShareButton
                    title="Continue"
                    onPress={handleForgotPassword}
                    pressStyle = {{marginTop: 15, paddingStart: "35%" }}
                    btnStyle = {{backgroundColor: AppColors.JAZZBERRY_JAM, borderRadius: 10}}
                />
                
                
            </View>
        </KeyboardAwareScrollView>
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
    }
})

export default ForgotPassword;