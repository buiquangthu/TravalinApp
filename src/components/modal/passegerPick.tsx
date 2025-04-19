import { Minus, Plus } from "@/assets/svgs";
import { AppColors } from "@/utils/constant";
import { ReactNode, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SvgProps } from "react-native-svg";

type PassegerType = 'ADULT' | 'CHILD' | 'BABY';

interface Iprops{
    icon?: ReactNode;
    title: string;
    description: string;
    passegerCount: number;
    passegerType: PassegerType;
    setPasseger: (count: number, passegerType: PassegerType) => void;
    
}
const PassengerPick = (props: Iprops) =>{
    const {icon, title, description, passegerCount, passegerType, setPasseger} = props;

    return(
        <View style = {styles.container}>
            <View style ={{gap: 10, flex: 1, flexDirection: 'row'}}>
                {icon && <View style={{}}>{icon}</View>}
                <View style={{flexDirection: "column"}}>
                    <Text style={{fontSize: 17, fontWeight: "bold"}}>{title}</Text>
                    <Text style={{fontSize: 14, color: "#666"}}>{description}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", gap: 5}}>
            <TouchableOpacity style = {styles.button}
                disabled={passegerCount <= 0}
                onPress={() => {
                    setPasseger(passegerCount - 1, passegerType)
                }}
            >
                    <Text>
                        <Minus/>
                    </Text>
                </TouchableOpacity>
                
                <Text style={{height: 40, width: 50, textAlign:'center', textAlignVertical: 'center', borderWidth: 1, borderColor:'#DDDDE3', borderRadius: 8}}>{passegerCount}</Text>
                <TouchableOpacity style = {styles.button} onPress={
                    () => {
                        setPasseger(passegerCount + 1, passegerType)
                    }
                }>
                    <Text>
                        <Plus/>
                    </Text>
                </TouchableOpacity>

            </View>
            </View>

    )
}

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        flexDirection: "row",
        padding: 10,
        paddingHorizontal: 15,
        justifyContent: "space-between",
        // borderWidth:1,
        // borderColor: AppColors.BLACK,
    },
    button:{
        // flex: 1,
        // backgroundColor: AppColors.LIGHT_BLUE,
        borderWidth: 1,
        borderColor: AppColors.LIGHT_BLUE,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,
    }

});
export default PassengerPick;