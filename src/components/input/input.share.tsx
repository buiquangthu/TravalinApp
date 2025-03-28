import { AppColors } from "@/utils/constant";
import React, { useState } from "react";
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, View, ViewStyle,Text, TouchableOpacity } from "react-native"
import { FontAwesome } from "@expo/vector-icons";

interface Iprops {
    label?: string;
    placeholder?: string;
    value?: any;
    onChangeText?: (text: string) => void;
    keyboadType?: KeyboardTypeOptions;
    style?: StyleProp<ViewStyle>;
    icon?: React.ReactNode;
    secureTextEntry?: boolean;
}

const ShareInput = (props: Iprops) =>{

    const {
        label, 
        placeholder, 
        value, 
        onChangeText, 
        keyboadType = "default", 
        style, 
        icon, 
        secureTextEntry = false
    } = props;

    const [isSecure, setIsSecure] = useState(secureTextEntry);

    return(
        <View style = {[styles.container, value !== "" ?{borderColor: AppColors.JAZZBERRY_JAM} : {},style]}>
            {value ? <Text style = {{paddingLeft:5, color: AppColors.JAZZBERRY_JAM}}>{label}</Text> : null}
            <View style = {[styles.inputWrapper]}>
                {!value && icon && icon}
                <TextInput
                    placeholder = {placeholder}
                    placeholderTextColor={AppColors.GRAY}
                    value = {value}
                    onChangeText = {onChangeText}
                    keyboardType = {keyboadType}
                    secureTextEntry = {isSecure}
                    autoCapitalize="none"
                    style = {[styles.input, {paddingLeft: 5, opacity: value ? 1 : 0.3}, value ? {paddingBottom: 20} : {}]}
                />
                {secureTextEntry && value &&(
                    <TouchableOpacity 
                        onPress={ () => setIsSecure(!isSecure)
                        }>
                        <FontAwesome name={isSecure ? "eye-slash" : "eye"} size={20} color={AppColors.GRAY} style = {{opacity: 0.5, marginBottom: 5}}/>
                    </TouchableOpacity>
                )}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth:1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginVertical: 10,
        marginHorizontal: 15,
        height: 55
    },
    label:{
        fontSize: 12,
        color: AppColors.GRAY,
    },
    inputWrapper:{
        flexDirection: "row",
        alignItems: "center",
        // paddingHorizontal: 5
    },
    input:{
        flex: 1,
        fontSize: 16,
        color: AppColors.BLACK,

    }
})


export default ShareInput;