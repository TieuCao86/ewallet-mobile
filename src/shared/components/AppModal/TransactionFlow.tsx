import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type FlowType = "TOP_UP" | "WITHDRAW" | "TRANSFER";

interface TransactionFlowProps {
  type: FlowType;
  bankName?: string;
  receiverName?: string;
}

export default function TransactionFlow({
  type,
  bankName,
  receiverName,
}: TransactionFlowProps) {
  const renderSource = () => {
    switch (type) {
      case "TOP_UP":
        return (
          <>
            <Ionicons name="card-outline" size={28} color="#005BEA" />
            <Text style={styles.title}>{bankName || "Ngân hàng"}</Text>
            <Text style={styles.subtitle}>Nguồn tiền</Text>
          </>
        );

      case "WITHDRAW":
        return (
          <>
            <Ionicons name="wallet-outline" size={28} color="#005BEA" />
            <Text style={styles.title}>Ví eWallet</Text>
            <Text style={styles.subtitle}>Nguồn tiền</Text>
          </>
        );

      case "TRANSFER":
        return (
          <>
            <Ionicons name="wallet-outline" size={28} color="#005BEA" />
            <Text style={styles.title}>Ví eWallet</Text>
            <Text style={styles.subtitle}>Người gửi</Text>
          </>
        );
    }
  };

  const renderDestination = () => {
    switch (type) {
      case "TOP_UP":
        return (
          <>
            <Ionicons name="wallet-outline" size={28} color="#10B981" />
            <Text style={styles.title}>Ví eWallet</Text>
            <Text style={styles.subtitle}>Điểm đến</Text>
          </>
        );

      case "WITHDRAW":
        return (
          <>
            <Ionicons name="card-outline" size={28} color="#10B981" />
            <Text style={styles.title}>{bankName || "Ngân hàng"}</Text>
            <Text style={styles.subtitle}>Nhận tiền</Text>
          </>
        );

      case "TRANSFER":
        return (
          <>
            <Ionicons name="person-outline" size={28} color="#10B981" />
            <Text style={styles.title}>{receiverName || "Người nhận"}</Text>
            <Text style={styles.subtitle}>Người nhận</Text>
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>{renderSource()}</View>

      <View style={styles.arrow}>
        <Ionicons name="arrow-forward" size={26} color="#999" />
      </View>

      <View style={styles.item}>{renderDestination()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  arrow: {
    paddingHorizontal: 12,
  },
  title: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#777",
  },
});