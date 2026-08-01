import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import AppButton from "../AppButton/AppButton";

interface ErrorModalProps {
    visible: boolean;
    title?: string;
    message?: string;
    buttonText?: string;
    onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
    visible,
    title = "Thông báo",
    message = "Đã có lỗi xảy ra. Vui lòng thử lại sau!",
    buttonText = "ĐÓNG",
    onClose,
}) => {
    if (!visible) return null;

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    {/* Icon Cảnh báo Lỗi */}
                    <View style={styles.iconContainer}>
                        <Ionicons name="alert-circle" size={56} color="#EF4444" />
                    </View>

                    {/* Tiêu đề & Nội dung lỗi */}
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    {/* Nút đóng Modal */}
                    <View style={styles.buttonWrapper}>
                        <AppButton title={buttonText} onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    card: {
        width: "100%",
        maxWidth: 340,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    iconContainer: {
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1F2937",
        textAlign: "center",
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        color: "#4B5563",
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 20,
    },
    buttonWrapper: {
        width: "100%",
    },
});