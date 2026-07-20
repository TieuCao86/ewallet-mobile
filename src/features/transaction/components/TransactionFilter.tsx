import { Pressable, StyleSheet, Text, View } from "react-native";
import { TransactionType } from "../types/transaction";

interface Props {
    value: TransactionType;
    onChange: (type: TransactionType) => void;
}

const tabs: TransactionType[] = [
    "ALL",
    "OUT",
    "IN"
];

export default function TransactionFilter({
    value,
    onChange,
}: Props) {

    return (
        <View style={styles.container}>

            {tabs.map(item => (

                <Pressable
                    key={item}
                    onPress={() => onChange(item)}
                    style={[
                        styles.button,
                        value === item && styles.active
                    ]}
                >
                    <Text
                        style={[
                            styles.text,
                            value === item && styles.activeText
                        ]}
                    >
                        {
                            item === "ALL"
                                ? "Tất cả"
                                : item === "OUT"
                                    ? "Ghi nợ"
                                    : "Ghi có"
                        }
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
        marginVertical: 15
    },

    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 25
    },

    active: {
        backgroundColor: "#fff"
    },

    text: {
        textAlign: "center",
        color: "#666",
        fontWeight: "600"
    },

    activeText: {
        color: "#0A84FF"
    }

});