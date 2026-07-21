import { Pressable, StyleSheet, Text, View } from "react-native";
import { TransactionFilterType } from "../types/transaction";

interface Props {
    value: TransactionFilterType;
    onChange: (value: TransactionFilterType) => void;
}

const tabs: TransactionFilterType[] = ["ALL", "IN", "OUT"];

export default function TransactionFilter({ value, onChange }: Props) {
    return (
        <View style={styles.container}>
            {tabs.map((item) => (
                <Pressable
                    key={item}
                    onPress={() => onChange(item)}
                    style={[styles.button, value === item && styles.active]}
                >
                    <Text style={[styles.text, value === item && styles.activeText]}>
                        {item === "ALL" ? "Tất cả" : item === "IN" ? "Tiền vào" : "Tiền ra"}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#F3F4F6",
        borderRadius: 30,
        padding: 4,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 25,
    },
    active: {
        backgroundColor: "#fff",
    },
    text: {
        textAlign: "center",
        color: "#6B7280",
        fontWeight: "600",
        fontSize: 14,
    },
    activeText: {
        color: "#0A84FF",
    },
});