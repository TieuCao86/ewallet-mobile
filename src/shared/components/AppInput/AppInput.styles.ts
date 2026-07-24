import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 16,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 6,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",

        height: 50,

        backgroundColor: "#FFFFFF",

        borderWidth: 1,
        borderColor: "#D9D9D9",

        borderRadius: 10,

        paddingHorizontal: 12,
    },

    input: {
        flex: 1,
        fontSize: 15,
        color: "#222",
        paddingVertical: 0,
    },

    iconLeft: {
        marginRight: 10,
    },

    iconRight: {
        marginLeft: 10,
    },

    inputError: {
        borderColor: "#E53935",
    },

    error: {
        marginTop: 5,
        color: "#E53935",
        fontSize: 12,
    },
});