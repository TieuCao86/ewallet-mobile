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

import PrimaryButton from "@/shared/components/AppButton";

import { AmountInput } from "../components/AmountInput";
import { DestinationPicker } from "../components/DestinationPicker";
import { PaymentSourcePicker } from "../components/PaymentSourcePicker";
import { TopUpModal } from "../components/TopUpModal";
import { useTopUp } from "../hooks/useTopUp";

export default function TopUpScreen() {
    const { myBanks, loading, submitting, handleInitiate, handleConfirm } = useTopUp();

    const [destination, setDestination] = useState<"wallet" | "bag">("wallet");
    const [amount, setAmount] = useState<string>("");
    const [selectedBankId, setSelectedBankId] = useState<number | null>(null);

    // Modal State
    const [step, setStep] = useState<"IDLE" | "PIN" | "OTP">("IDLE");
    const [pin, setPin] = useState<string>("");
    const [otp, setOtp] = useState<string>("");

    // Countdown State
    const [countdown, setCountdown] = useState<number>(60);
    const [canResend, setCanResend] = useState<boolean>(false);

    const numericAmount = Number(amount.replace(/\D/g, "")) || 0;

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

        const bankIdToUse =
            selectedBankId || (myBanks.length > 0 ? myBanks[0].id : null);

        if (!bankIdToUse) {
            Alert.alert("Thông báo", "Vui lòng chọn hoặc liên kết thêm ngân hàng");
            return;
        }
        setSelectedBankId(bankIdToUse);
        setStep("PIN");
    };

    const onSubmitPin = () => {
        if (!selectedBankId) return;
        handleInitiate(selectedBankId, numericAmount, pin, () => {
            setCountdown(60);
            setStep("OTP");
        });
    };

    const onSubmitOtp = () => {
        if (!selectedBankId) return;

        handleConfirm(
            selectedBankId,
            numericAmount,
            otp,
            (data) => {

                Alert.alert(
                    "Nạp tiền thành công",
                    `Bạn đã nạp ${numericAmount.toLocaleString("vi-VN")} đ vào ví`,
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                setStep("IDLE");
                                setAmount("");
                                setPin("");
                                setOtp("");
                                router.back();
                            },
                        },
                    ]
                );

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
            <LinearGradient colors={["#005BEA", "#00C6FB"]} style={styles.header}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Nạp tiền vào ví</Text>
                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="information-circle-outline" size={24} color="#FFF" />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* CARD 1: ĐÍCH ĐẾN & INPUT SỐ TIỀN */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Nạp tiền vào</Text>
                    <DestinationPicker
                        destination={destination}
                        onSelect={setDestination}
                    />
                    <AmountInput
                        value={amount}
                        onChangeText={(val) => setAmount(val.replace(/\D/g, ""))}
                        onClear={() => setAmount("")}
                    />
                </View>

                {/* CARD 2: NGUỒN TIỀN THANH TOÁN */}
                <PaymentSourcePicker
                    banks={myBanks}
                    loading={loading}
                    selectedBankId={selectedBankId}
                    onSelectBank={setSelectedBankId}
                    onAddBank={() => router.push("/bank/link" as any)}
                />
            </ScrollView>

            {/* NÚT BẤM NẠP TIỀN CỐ ĐỊNH Ở ĐÁY MÀN HÌNH */}
            <View style={styles.bottomContainer}>
                <PrimaryButton
                    title="NẠP TIỀN"
                    onPress={onPressTopUp}
                />
            </View>

            {/* MODAL XÁC NHẬN PIN / OTP */}
            <TopUpModal
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