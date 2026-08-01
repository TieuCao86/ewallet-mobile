import AppButton from "@/shared/components/AppButton/AppButton";
import AppInput from "@/shared/components/AppInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type AuthStep = "IDLE" | "PIN" | "OTP";

interface TransactionAuthModalProps {
    step: AuthStep;
    title?: string;
    actionName?: string; // Tên hành động: "Nạp", "Rút", "Chuyển"
    amountFormatted?: string; // Số tiền dạng format "100,000"
    phoneNumber?: string; // Số điện thoại nhận OTP "098*****86"
    pin: string;
    otp: string;
    submitting: boolean;
    countdown: number;
    canResend: boolean;
    error?: string;
    onChangePin: (val: string) => void;
    onChangeOtp: (val: string) => void;
    onSubmitPin: () => void;
    onSubmitOtp: () => void;
    onResendOtp: () => void;
    onClose: () => void;
}

export const TransactionAuthModal: React.FC<TransactionAuthModalProps> = ({
    step,
    title,
    actionName = "nạp",
    amountFormatted,
    phoneNumber = "098*****86",
    pin,
    otp,
    submitting,
    countdown,
    canResend,
    error,
    onChangePin,
    onChangeOtp,
    onSubmitPin,
    onSubmitOtp,
    onResendOtp,
    onClose,
}) => {
    if (step === "IDLE") return null;

    return (
        <Modal visible={true} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Header Icon */}
                    <View style={styles.iconHeader}>
                        <MaterialCommunityIcons
                            name={step === "PIN" ? "shield-key-outline" : "cellphone-message"}
                            size={40}
                            color="#005BEA"
                        />
                    </View>

                    {/* Tiêu đề Modal */}
                    <Text style={styles.modalTitle}>
                        {title || (step === "PIN" ? "Xác nhận mã PIN" : "Xác thực mã OTP")}
                    </Text>

                    {/* Mô tả chi tiết cho bước OTP */}
                    {step === "OTP" ? (
                        <View style={styles.summaryContainer}>
                            <Text style={styles.modalSub}>
                                Mã xác nhận OTP đã được gửi đến SĐT{" "}
                                <Text style={styles.boldText}>{phoneNumber}</Text>
                            </Text>

                            {amountFormatted && (
                                <View style={styles.amountBadge}>
                                    <Text style={styles.amountBadgeText}>
                                        Xác nhận {actionName}:{" "}
                                        <Text style={styles.amountHighlight}>{amountFormatted} đ</Text>
                                    </Text>
                                </View>
                            )}
                        </View>
                    ) : (
                        <Text style={styles.modalSub}>
                            Vui lòng nhập mã PIN giao dịch gồm 6 chữ số để tiếp tục.
                        </Text>
                    )}

                    {/* Ô nhập mã PIN / OTP */}
                    <View style={styles.inputWrapper}>
                        <AppInput
                            secureTextEntry={step === "PIN"}
                            keyboardType="numeric"
                            maxLength={6}
                            placeholder={step === "PIN" ? "••••••" : "123456"}
                            value={step === "PIN" ? pin : otp}
                            onChangeText={step === "PIN" ? onChangePin : onChangeOtp}
                            error={error}
                            style={styles.centeredInput}
                        />
                    </View>

                    {/* Đếm ngược & Gửi lại mã OTP */}
                    {step === "OTP" && (
                        <View style={styles.resendWrapper}>
                            {canResend ? (
                                <TouchableOpacity onPress={onResendOtp} disabled={submitting}>
                                    <Text style={styles.resendText}>Gửi lại mã OTP</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.timerText}>
                                    Không nhận được mã? Gửi lại sau{" "}
                                    <Text style={styles.countdownText}>{countdown}s</Text>
                                </Text>
                            )}
                        </View>
                    )}

                    {/* Nút thao tác HỦY / XÁC NHẬN */}
                    <View style={styles.modalActions}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={onClose}
                            disabled={submitting}
                        >
                            <Text style={styles.cancelText}>HỦY BỎ</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 1 }}>
                            <AppButton
                                title={step === "PIN" ? "TIẾP TỤC" : `XÁC NHẬN ${actionName.toUpperCase()}`}
                                onPress={step === "PIN" ? onSubmitPin : onSubmitOtp}
                                loading={submitting}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContent: {
        width: "100%",
        maxWidth: 380,
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    iconHeader: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#EFF6FF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 8,
        textAlign: "center",
    },
    summaryContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    modalSub: {
        fontSize: 13,
        color: "#6B7280",
        textAlign: "center",
        lineHeight: 20,
    },
    boldText: {
        fontWeight: "700",
        color: "#1F2937",
    },
    amountBadge: {
        marginTop: 10,
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    amountBadgeText: {
        fontSize: 13,
        color: "#4B5563",
    },
    amountHighlight: {
        fontWeight: "700",
        color: "#005BEA",
    },
    inputWrapper: {
        width: "100%",
        marginBottom: 12,
    },
    centeredInput: {
        textAlign: "center",
        fontSize: 22,
        letterSpacing: 10,
        fontWeight: "700",
        color: "#1F2937",
    },
    resendWrapper: {
        marginBottom: 20,
        alignItems: "center",
    },
    resendText: {
        color: "#005BEA",
        fontWeight: "700",
        fontSize: 13,
    },
    timerText: {
        color: "#6B7280",
        fontSize: 13,
    },
    countdownText: {
        fontWeight: "700",
        color: "#EF4444",
    },
    modalActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        width: "100%",
    },
    cancelBtn: {
        flex: 1,
        height: 52,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: "#F3F4F6",
    },
    cancelText: {
        color: "#4B5563",
        fontWeight: "700",
        fontSize: 14,
    },
});