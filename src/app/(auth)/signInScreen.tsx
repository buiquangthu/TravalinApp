import { AppColors } from "@/utils/constant";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const SignInScreen = () => {
    return(
        <View style = {styles.container}>
            <View style = {styles.signin}>
                <Text style = {styles.title}>Let’s Travel you in.</Text>
                <Text style = {styles.text}>Discover the World with Every Sign In</Text>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: AppColors.TEAL_BLUE
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
        fontSize: 28,
        fontWeight: 'bold',
        paddingTop: 36,
        paddingLeft: 28
    },
    text:{
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 28,
        paddingRight: 78

    }
})

export default SignInScreen;