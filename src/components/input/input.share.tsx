import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from "react-native";
import { AppColors } from "@/utils/constant";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  label?: string;
  placeholder?: string;
  value?: any;
  onChangeText?: (text: string) => void;
  keyboadType?: KeyboardTypeOptions;
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  secureTextEntry?: boolean;
  onPressIn?: () => void;
  editable?: boolean;
}

const ShareInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboadType = "default",
  style,
  icon,
  secureTextEntry = false,
  onPressIn,
  editable = true,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <Pressable onPress={!editable ? onPressIn : undefined} style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          !label && { alignItems: "center" }, // 👈 nếu không có label thì căn giữa input
        ]}
      >
        {icon && <View style={{ marginRight: 6 }}>{icon}</View>}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={AppColors.GRAY}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboadType}
          secureTextEntry={isSecure}
          editable={editable}
          style={[
            styles.input,
            !!value && styles.inputFilled,
            { opacity: editable ? 1 : 0.8 },
          ]}
        />
        {secureTextEntry && value && (
          <FontAwesome
            name={isSecure ? "eye-slash" : "eye"}
            size={20}
            color={AppColors.GRAY}
            style={{ marginLeft: 10 }}
            onPress={() => setIsSecure(!isSecure)}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 10,
    marginHorizontal: 15,
    borderColor: "#ccc",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-start", // mặc định khi có label
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: AppColors.BLACK,
  },
  label: {
    fontSize: 10,
    color: AppColors.JAZZBERRY_JAM,
    marginBottom: 6,
  },
  inputFilled: {
    // fontWeight: "bold",
    fontSize: 14,
  },
});

export default ShareInput;
