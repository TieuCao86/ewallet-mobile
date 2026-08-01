import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DestinationPickerProps {
    destination: "wallet" | "bag";
    onSelect: (dest: "wallet" | "bag") => void;
}

export const DestinationPicker = ({
    destination,
    onSelect,
}: DestinationPickerProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.box, destination === "wallet" && styles.boxActive]}
                onPress={() => onSelect("wallet")}
                activeOpacity={0.8}
            >
                <View style={styles.header}>
                    <Ionicons name="wallet-outline" size={26} color="#1976D2" />
                    <View>
                        <Text style={styles.name}>Ví VT Bank</Text>
                        <Text style={styles.subText}>Ví chính</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.box, destination === "bag" && styles.boxActive]}
                onPress={() => onSelect("bag")}
                activeOpacity={0.8}
            >
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>6.1%/năm</Text>
                </View>
                <View style={styles.header}>
                    <MaterialCommunityIcons name="sack" size={26} color="#D32F2F" />
                    <View>
                        <Text style={styles.name}>Túi Thần Tài</Text>
                        <Text style={styles.subText}>Sinh lời</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 16,
    },
    box: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        padding: 10,
        backgroundColor: "#FFF",
        position: "relative",
    },
    boxActive: {
        borderColor: "#8E24AA",
        borderWidth: 1.5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    name: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#333",
    },
    subText: {
        fontSize: 11,
        color: "#666",
        marginTop: 2,
    },
    badge: {
        position: "absolute",
        top: -8,
        right: 6,
        backgroundColor: "#E65100",
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 8,
        zIndex: 1,
    },
    badgeText: {
        color: "#FFF",
        fontSize: 8,
        fontWeight: "bold",
    },
});