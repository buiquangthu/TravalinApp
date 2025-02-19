import { AppColors } from "@/utils/constant";
import { ReactNode } from "react";
import { Pressable, StyleProp, View, ViewStyle, StyleSheet,Text, TextStyle } from "react-native";


interface Iprops {
    title: string;
    onPress: () => void;
    icon?: ReactNode;
    textStyle?: StyleProp<TextStyle>;
    pressStyle?: StyleProp<ViewStyle>;
    btnStyle?: StyleProp<ViewStyle>;
    loading?: boolean;
    iconFlex?: "left" | "right";
}

const ShareButton = (props: Iprops) =>{

    const {title, onPress, icon, textStyle, loading, pressStyle, btnStyle, iconFlex = "left"} = props;
    return(
        <Pressable
        disabled = {loading}
        style = { ({pressed}) => ([{
            opacity: pressed == true || loading ? 0.5 : 1,
            alignSelf: "flex-start"
        },pressStyle])}  
        onPress = {onPress}  
    >
            <View style = {[styles.btnContainer, btnStyle]}>
                {iconFlex == "left" && icon}
                <Text style = {[styles.text, textStyle]}>{title}</Text>
                {iconFlex == "right" && icon}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btnContainer:{
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        backgroundColor: AppColors.TEAL_BLUE
    },
    text: {
        fontSize: 16,
        color: AppColors.WHITE, // Mặc định là màu trắng để hiển thị tốt trên nền tối
        fontWeight: "600"
    }
})

export default ShareButton;