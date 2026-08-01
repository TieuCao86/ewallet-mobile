import AppInput from "@/shared/components/AppInput";
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface TopUpModalProps {
    step: "IDLE" | "PIN" | "OTP";
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

export const TopUpModal = ({
    step,
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
}: TopUpModalProps) => {
    if (step === "IDLE") return null;

    return (
        <Modal visible={true} transparent animationType="slide">
            <View style={modalStyles.modalOverlay}>
                <View style={modalStyles.modalContent}>
                    <Text style={modalStyles.modalTitle}>
                        {step === "PIN" ? "Xác nhận mã PIN" : "Nhập mã OTP"}
                    </Text>

                    <Text style={modalStyles.modalSub}>
                        {step === "PIN"
                            ? "Nhập mã PIN giao dịch của bạn để tiếp tục"
                            : "Mã OTP đã được gửi đến số điện thoại của bạn"}
                    </Text>

                    <View style={modalStyles.inputWrapper}>
                        <AppInput
                            secureTextEntry={step === "PIN"}
                            keyboardType="numeric"
                            maxLength={6}
                            placeholder={step === "PIN" ? "••••••" : "123456"}
                            value={step === "PIN" ? pin : otp}
                            onChangeText={step === "PIN" ? onChangePin : onChangeOtp}
                            error={error}
                            style={modalStyles.centeredInput}
                        />
                    </View>

                    {step === "OTP" && (
                        <View style={modalStyles.resendWrapper}>
                            {canResend ? (
                                <TouchableOpacity onPress={onResendOtp} disabled={submitting}>
                                    <Text style={modalStyles.resendText}>Gửi lại mã OTP</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={modalStyles.timerText}>
                                    Gửi lại mã sau{" "}
                                    <Text style={{ fontWeight: "bold" }}>{countdown}s</Text>
                                </Text>
                            )}
                        </View>
                    )}

                    <View style={modalStyles.modalActions}>
                        <TouchableOpacity style={modalStyles.cancelBtn} onPress={onClose}>
                            <Text style={modalStyles.cancelText}>HỦY</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={modalStyles.confirmBtn}
                            onPress={step === "PIN" ? onSubmitPin : onSubmitOtp}
                            disabled={submitting}
                        >
                            {submitting ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={modalStyles.confirmText}>XÁC NHẬN</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const modalStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    modalSub: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
        marginBottom: 16,
    },
    inputWrapper: {
        width: "100%",
        marginBottom: 12,
    },
    centeredInput: {
        textAlign: "center",
        fontSize: 20,
        letterSpacing: 8,
    },
    resendWrapper: {
        marginBottom: 16,
        alignItems: "center",
    },
    resendText: {
        color: "#8E24AA",
        fontWeight: "bold",
        fontSize: 13,
    },
    timerText: {
        color: "#757575",
        fontSize: 13,
    },
    modalActions: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    cancelBtn: {
        flex: 1,
        padding: 12,
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
    },
    cancelText: {
        color: "#666",
        fontWeight: "bold",
    },
    confirmBtn: {
        flex: 1,
        padding: 12,
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#8E24AA",
    },
    confirmText: {
        color: "#FFF",
        fontWeight: "bold",
    },
});