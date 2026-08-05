import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AmountInput } from "@/shared/components/AppInput/AmountInput";
import TransactionFlow from "@/shared/components/AppModal/TransactionFlow";
import TransactionPinOtpModal from "@/shared/components/AppModal/TransactionPinOtpModal";
import BankPicker from "@/shared/components/BankPicker";

import PrimaryButton from "@/shared/components/AppButton";

import { useConfirmTopUp } from "../hooks/useConfirmTopUp";
import { useInitiateTopUp } from "../hooks/useInitiateTopUp";
import { useMyPaymentSources } from "../hooks/useMyPaymentSources";

export default function TopUpScreen() {
    const { data: myBanks = [], isLoading } = useMyPaymentSources();

    const initiateMutation = useInitiateTopUp();
    const confirmMutation = useConfirmTopUp();

    const [amount, setAmount] = useState<string>("");
    const [selectedBankAccountId, setSelectedBankAccountId] = useState<number | null>(null);

    // Modal State
    const [step, setStep] = useState<"IDLE" | "PIN" | "OTP">("IDLE");
    const [pin, setPin] = useState<string>("");
    const [otp, setOtp] = useState<string>("");

    // Countdown State
    const [countdown, setCountdown] = useState<number>(60);
    const [canResend, setCanResend] = useState<boolean>(false);

    const numericAmount = Number(amount.replace(/\D/g, "")) || 0;
    const submitting = initiateMutation.isPending || confirmMutation.isPending;

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (step === "OTP" && countdown > 0) {
            setCanResend(false);
            timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
        } else if (countdown === 0) {
            setCanResend(true);
        }
        return () => clearInterval(timer);
    }, [step, countdown]);

    const onPressTopUp = () => {
        if (!numericAmount || numericAmount < 10000) {
            Alert.alert("Thông báo", "Số tiền nạp tối thiểu là 10,000 đ");
            return;
        }

        const bankAccountIdToUse = selectedBankAccountId || (myBanks.length > 0 ? myBanks[0].bankAccountId : null);

        if (!bankAccountIdToUse) {
            Alert.alert(
                "Thông báo",
                "Vui lòng chọn hoặc liên kết thêm ngân hàng"
            );
            return;
        }

        setSelectedBankAccountId(bankAccountIdToUse);
        setStep("PIN");
    };

    const onSubmitPin = () => {
        if (!selectedBankAccountId) return;

        initiateMutation.mutate(
            {
                bankAccountId: selectedBankAccountId,
                amount: numericAmount,
                pin,
            },
            {
                onSuccess: () => {
                    setCountdown(60);
                    setStep("OTP");
                },
                onError: (error: any) => {
                    Alert.alert(
                        "Lỗi",
                        error?.response?.data?.message || "Xác thực PIN thất bại"
                    );
                },
            }
        );
    };

    const onSubmitOtp = () => {
        if (!selectedBankAccountId) return;

        confirmMutation.mutate(
            {
                bankAccountId: selectedBankAccountId,
                amount: numericAmount,
                otp,
            },
            {
                onSuccess: (response) => {

                    const transaction = response.data;

                    setStep("IDLE");
                    setAmount("");
                    setPin("");
                    setOtp("");

                    router.replace({
                        pathname: "/transaction/success",
                        params: {
                            transactionCode: transaction.transactionCode,
                            amount: String(transaction.amount),
                            senderName: transaction.senderName,
                            recipientName: transaction.receiverName,
                            transactionTime: transaction.completedAt,
                            transactionType: transaction.type,
                        },
                    });
                },

                onError: (error: any) => {
                    Alert.alert(
                        "Lỗi",
                        error?.response?.data?.message || "OTP không chính xác"
                    );
                },
            }
        );
    };

    const handleResendOtp = () => {
        setCountdown(60);
        setCanResend(false);
        setOtp("");
        Alert.alert("Thông báo", "Đã gửi lại mã OTP mới (Mock)");
    };

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            {/* HEADER GRADIENT */}
            <LinearGradient
                colors={["#005BEA", "#00C6FB"]}
                style={styles.header}
            >
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Nạp tiền vào ví</Text>
                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons
                        name="information-circle-outline"
                        size={24}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* CARD 1: ĐÍCH ĐẾN & INPUT SỐ TIỀN */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Thông tin giao dịch</Text>

                    <TransactionFlow
                        type="TOP_UP"
                        bankName={
                            myBanks.find(bank => bank.bankAccountId === selectedBankAccountId)?.bankName
                        }
                    />

                    <View style={{ height: 16 }} />

                    <AmountInput
                        value={amount}
                        onChangeText={(val) => setAmount(val.replace(/\D/g, ""))}
                        onClear={() => setAmount("")}
                    />
                </View>

                {/* CARD 2: NGUỒN TIỀN THANH TOÁN */}
                <BankPicker
                    banks={myBanks}
                    loading={isLoading}
                    selectedBankAccountId={selectedBankAccountId}
                    onSelectBankAccount={setSelectedBankAccountId}
                    onAddBank={() => router.push("/bank/link" as any)}
                />
            </ScrollView>

            {/* NÚT BẤM NẠP TIỀN CỐ ĐỊNH Ở ĐÁY MÀN HÌNH */}
            <View style={styles.bottomContainer}>
                <PrimaryButton title="NẠP TIỀN" onPress={onPressTopUp} />
            </View>

            {/* MODAL XÁC NHẬN PIN / OTP */}
            <TransactionPinOtpModal
                visible={step !== "IDLE"}
                step={step}
                pin={pin}
                otp={otp}
                submitting={submitting}
                countdown={countdown}
                canResend={canResend}
                onChangePin={setPin}
                onChangeOtp={setOtp}
                onSubmitPin={onSubmitPin}
                onSubmitOtp={onSubmitOtp}
                onResendOtp={handleResendOtp}
                onClose={() => {
                    setStep("IDLE");
                    setPin("");
                    setOtp("");
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F4F7",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    headerTitle: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "600",
    },
    iconBtn: {
        padding: 4,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 24,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#1A1A1A",
        marginBottom: 12,
    },
    bottomContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
});