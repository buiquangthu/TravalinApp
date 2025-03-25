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
            <Stack.Screen name= "(auth)/registerScreen" />
        </Stack>
    )
}
export default Rootlayout;