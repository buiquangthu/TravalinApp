import ShareInput from "@/components/input/input.share";
import { AppColors } from "@/utils/constant";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";

const RegisterScreen = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    return(
        <SafeAreaView style = {styles.container}>
            <View style = {[styles.logo]}>
                <Image source = {require("../../assets/logoFly.png")}/>
                <Text style = {[styles.title]}>Register Now</Text>
                <Text style = {styles.text}>Enter your information below</Text>
            </View>

            <View style = {styles.infoRegister}>
                <ShareInput
                    label="Name"
                    placeholder="Enter Name"
                    onChangeText={setName}
                    value={name}
                />

                <ShareInput
                    label="Email Address"
                    placeholder="Enter Email"
                    onChangeText={setEmail}
                    value={email}
                    keyboadType="email-address"
                />

                <ShareInput
                    label="Mobile Number"
                    placeholder="Enter Mobile Number"
                    onChangeText={setMobile}
                    value={mobile}
                    keyboadType="phone-pad"
                />
            </View>

        </SafeAreaView>
    )

};
const styles = StyleSheet.create({
    container:{
        backgroundColor: AppColors.WHITE,
        flex: 1
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
        opacity: 0.3
    },
    infoRegister:{

    }


});

export default RegisterScreen;