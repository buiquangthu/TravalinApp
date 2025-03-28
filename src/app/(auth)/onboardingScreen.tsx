import { ImageBackground, Text, View, Image, StyleSheet, Pressable, ScrollView } from "react-native"
import ShareButton from "@/components/button/button.share";
import { router } from "expo-router";
import axios from "axios";
import { useEffect } from "react";

const OnboardingScreen = () =>{
    // useEffect(() => {
    //     const ping = async () => {
    //         try {
    //             console.log('Pinging the server...');
    //             const response = await axios.get('http://192.168.1.16:8080/flight_booking/users');
    //             console.log('Ping response:', response.data);
    //         } catch (error) {
    //             console.error('Error pinging the server:', error);
    //         }
    //     };

    //     ping();
    // }, []);
    return(
        <ImageBackground source={require('../../assets/Background.png')} style={styles.container}>
            <ScrollView>
                <View style = {styles.logo}>
                    <Image source={require('../../assets/Logo.png')}/>
                </View>
                <View style = {styles.card}>
                    <Text style = {styles.text}>Ready to explore beyond boundaries?</Text>

                    <ShareButton 
                        title="You are ready to explore"
                        onPress={()=> router.navigate("/(auth)/signInScreen")}
                        pressStyle = {styles.button}
                        btnStyle = {{borderRadius: 30, paddingHorizontal: "20%", paddingVertical: 15}}
                    />  
                </View>

            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    logo:{
        alignItems: 'center',
        paddingTop: "43%"
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
        fontSize: 40,
        color: '#007A8C',
        textAlign: 'center',
        margin: 30,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    },
    button:{
        alignSelf: 'center',
        borderRadius: 30
    }
})

export default OnboardingScreen;