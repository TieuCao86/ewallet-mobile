import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

// 1. Định nghĩa Props interface cho BankSearch
interface BankSearchProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

// 2. Nhận props vào component
export default function BankSearch({
  value,
  onChangeText,
  placeholder = "Tìm kiếm ngân hàng...",
}: BankSearchProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color="#888" />

      {/* 3. Truyền props vào TextInput */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    height: 42,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
});