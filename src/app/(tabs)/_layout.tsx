import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = () =>{
    return(
        <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home"; // Mặc định là "home"

          switch (route.name) {
            case "index":
              iconName = focused ? "home" : "home-outline";
              break;
            case "searchScreen":
              iconName = focused ? "search" : "search-outline";
              break;
            case "orderHistoryScreen":
              iconName = focused ? "list" : "list-outline";
              break;
            case "profileScreen":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              console.warn(`Không tìm thấy icon cho route: ${route.name}`);
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6200ea",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Ẩn header trên từng màn hình
      })}
    >
            <Tabs.Screen name="index"
                options={{
                    title: "Trang chủ"
                }}
            />
            <Tabs.Screen name="searchScreen"
                options={{
                    title: "Tìm kiếm"
                }}
            />

            <Tabs.Screen name="orderHistoryScreen"
                options={{
                    title: "Lịch sử đặt vé"
                }}
            />

            <Tabs.Screen name="profileScreen"
                options={{
                    title: "Cá nhân"
                }}
            />
            

        </Tabs>
    )
}

export default TabLayout;