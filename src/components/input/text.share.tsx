import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { AppColors } from "@/utils/constant";

interface Props {
  text: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>; 
}

const ShareText: React.FC<Props> = ({ text, icon, style }) => {
  return (
    <View style={[styles.container,style]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={styles.label}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    color: AppColors.GRAY,
  },
});

export default ShareText;
