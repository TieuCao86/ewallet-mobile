import { Colors } from "@/shared/theme/colors";
import { Radius } from "@/shared/theme/radius";
import { Shadows } from "@/shared/theme/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 8,
    },

    circleContainer: {
        width: "20%",
    },

    circleGradient: {
        width: 48,
        height: 48,
        borderRadius: Radius.md,

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 8,
    },

    titleCircle: {
        fontSize: 11,
        color: Colors.textSecondary,
        textAlign: "center",
        fontWeight: "500",
    },

    cardContainer: {
        width: "31%",
        backgroundColor: Colors.white,

        borderRadius: Radius.lg,

        paddingVertical: 14,
        paddingHorizontal: 8,

        marginHorizontal: "1%",

        ...Shadows.card,
    },

    iconBoxCard: {
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
    },

    titleCard: {
        fontSize: 12,
        color: Colors.text,
        textAlign: "center",
        fontWeight: "600",
        lineHeight: 16,
    },
});