import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={size + 2} />
          ),
        }}
      />

      {/* 2. TAB VÍ */}
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Giao dịch",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" color={color} size={size} />
          ),
        }}
      />

      {/* 3. TAB QUÉT QR */}
      <Tabs.Screen
        name="qr-scan"
        options={{
          title: "Quét QR",
          tabBarButton: (props) => {
            // Bóc tách onPress và style từ props để tự quản lý, né tránh ép các prop null từ expo-router
            const { onPress, style, children, ...restProps } = props as any;

            return (
              <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={[styles.qrButtonContainer, style]}
              >
                <View style={styles.qrButton}>
                  <MaterialCommunityIcons name="qrcode-scan" color="#208AEF" size={26} />
                </View>
                <Text style={styles.qrButtonLabel}>Quét QR</Text>
              </TouchableOpacity>
            );
          },
        }}
      />

      {/* 4. TAB THẺ */}
      <Tabs.Screen
        name="history" // Hoặc đổi sang route thẻ/lịch sử tùy bạn
        options={{
          title: "Thẻ",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card" color={color} size={size} />
          ),
        }}
      />

      {/* 5. TAB CÁ NHÂN */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Cá nhân",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // Thanh TabBar nền xanh thẫm bo cong mượt mà theo ảnh mẫu
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1E3A8A", // Màu xanh đậm đặc trưng của VT Bank
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 70,
    paddingBottom: 12,
    paddingTop: 8,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
  // Khối thiết kế cho nút QR nổi lên chính giữa thanh điều hướng
  qrButtonContainer: {
    top: -16, // Đẩy nút nhô lên phía trên thanh TabBar
    justifyContent: "center",
    alignItems: "center",
    width: 70,
  },
  qrButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 3,
    borderColor: "#1E3A8A", // Khớp với màu nền của TabBar tạo cảm giác uốn lượn liền khối
  },
  qrButtonLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
});