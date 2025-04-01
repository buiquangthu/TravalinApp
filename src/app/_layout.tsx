import { Stack } from "expo-router"
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';





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
        </Stack>
    )
}
export default Rootlayout;