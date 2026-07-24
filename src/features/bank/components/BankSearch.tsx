import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function BankSearch() {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color="#888" />

      <TextInput
        placeholder="Tìm kiếm ngân hàng..."
        style={styles.input}
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
  },
});