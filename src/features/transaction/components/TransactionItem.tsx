import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "../types/transaction";

interface Props {
    item: Transaction;
}

export default function TransactionItem({ item }: Props) {

    const income = item.type === "IN";

    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <Text style={styles.title}>
                    {item.title}
                </Text>

                <Text style={styles.time}>
                    {item.createdAt}
                </Text>
            </View>

            <Text
                style={[
                    styles.amount,
                    {
                        color: income ? "#10B981" : "#EF4444"
                    }
                ]}
            >
                {income ? "+" : "-"}
                {item.amount.toLocaleString("vi-VN")}
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