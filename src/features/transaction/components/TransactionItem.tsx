import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "../types/transaction";

interface Props {
    item: Transaction;
}

export default function TransactionItem({ item }: Props) {

    // 1. Kiểm tra chiều tiền vào dựa trên direction (IN)
    const isIncome = item.direction === "IN";

    // 2. Hiển thị đối tác giao dịch hoặc mô tả/mã giao dịch
    const displayTitle =
        item.otherPartyName || item.description || item.transactionCode;

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title} numberOfLines={1}>
                    {displayTitle}
                </Text>
                <Text style={styles.time}>{item.createdAt}</Text>
            </View>

            <Text
                style={[
                    styles.amount,
                    { color: isIncome ? "#10B981" : "#EF4444" },
                ]}
            >
                {isIncome ? "+" : "-"}
                {item.amount.toLocaleString("vi-VN")} đ
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#F2F2F2"
    },

    title: {
        fontSize: 16,
        fontWeight: "600"
    },

    time: {
        color: "#777",
        marginTop: 5
    },

    amount: {
        fontWeight: "700",
        fontSize: 18
    }

});