import { AppColors } from "@/utils/constant";
import { ReactNode } from "react";
import { Pressable, StyleProp, View, ViewStyle, StyleSheet,Text, TextStyle, TouchableOpacity } from "react-native";


interface Iprops {
    title: string;
    onPress: () => void;
    icon?: ReactNode;
    textStyle?: StyleProp<TextStyle>;
    pressStyle?: StyleProp<ViewStyle>;
    btnStyle?: StyleProp<ViewStyle>;
    loading?: boolean;
    iconFlex?: "left" | "right";
    tpye?: "primary" | "link";
}

const ShareButton = (props: Iprops) =>{

    const {title, onPress, icon, textStyle, loading, pressStyle, btnStyle, iconFlex = "left", tpye = "primary"} = props;
    return(
        tpye == "primary" ?
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
        :
            <TouchableOpacity
                onPress={onPress}
            >
                <Text style ={[{color : tpye === 'link' ? AppColors.JAZZBERRY_JAM : AppColors.GRAY}, textStyle]}>{title}</Text>

            </TouchableOpacity>
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