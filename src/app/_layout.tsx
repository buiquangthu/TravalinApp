import { Stack } from "expo-router"
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { StripeProvider } from "@stripe/stripe-react-native";





const Rootlayout = () =>{
    // const [isShowSplash, setIsShowSplash] = useState(true);

    // useEffect(() =>{
    //     const timeout = setTimeout(async() =>{
    //         setIsShowSplash(false);
    //         await SplashScreen.hideAsync();
    //     }, 3000);
    //         return () => clearTimeout(timeout);
    // },[])
    useEffect(() =>{
        SplashScreen.preventAutoHideAsync();
    },[])
    

    return(
    <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_KEY as string}
    >
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name = "(auth)/onboardingScreen" />
            <Stack.Screen name="index"/>
            <Stack.Screen name = "(auth)/signInScreen" />
            <Stack.Screen options ={{
                headerShown: true,
                headerShadowVisible: false,
                title: "",
                }} name= "(auth)/registerScreen" />
            <Stack.Screen options={{
                headerShown: true,
                headerShadowVisible: false,
                title:"",
            }}
            name = "(auth)/forgotPasswordScreen" />
            <Stack.Screen 
                options={{headerShown: true, headerShadowVisible: false, title: ""}}
                name = "(auth)/verifyOtpScreen" />
            <Stack.Screen options ={{ 
                headerShown: true,
                headerShadowVisible: false,
                title: ""
            }} name = "(auth)/resetPasswordScreen" />

            {/* Main Tabs Layout */}
            <Stack.Screen name="(tabs)" />

            {/* Màn search result (không thuộc tab) */}
            <Stack.Screen
            name="searchResultScreen"
            options={{ headerShown: false, title: "Kết quả tìm kiếm" }}/>

            <Stack.Screen
            name="customerInfoScreen"
            options={{headerShown: false}}/>

            <Stack.Screen
            name="paymentScreen"
            options={{headerShown: false}}/>

            <Stack.Screen
            name="changePasswordScreen"
            options={{headerShown: false}}/>
        </Stack>
    </StripeProvider>
    )
}
export default Rootlayout;