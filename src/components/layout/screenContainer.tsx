import React, { ReactNode } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title: string;
  children: ReactNode;
  showBack?: boolean;
  onBackPress?: () => void;
}

const ScreenContainer: React.FC<Props> = ({ title, children, showBack = true, onBackPress }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1e90ff" />
      <View style={styles.header}>
        {showBack && (
          <Pressable onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
        <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
      </View>
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1e90ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1e90ff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default ScreenContainer;
