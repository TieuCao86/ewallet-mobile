import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppButton from "@/shared/components/AppButton/AppButton";

export default function TransactionSuccessScreen() {
    // Lấy dữ liệu truyền từ router.push/replace bên màn hình Nạp/Rút/Chuyển tiền
    const params = useLocalSearchParams<{
        transactionCode?: string;
        amount?: string;
        senderName?: string;
        recipientName?: string;
        transactionTime?: string;
        transactionType?: string;
    }>();

    const amount = Number(params.amount) || 0;
    const senderName = params.senderName || "Ví E-Wallet";
    const recipientName = params.recipientName || "Hệ thống";
    const transactionCode = params.transactionCode || "";
    const transactionTime =
        params.transactionTime || new Date().toLocaleString("vi-VN");
    const transactionType = params.transactionType || "TOP_UP";

    const handleGoHome = () => {
        router.replace("/(tabs)/home");
    };

    const handleNewTransaction = () => {
        if (transactionType === "TOP_UP") {
            router.replace("/topup" as any);
        }
        else if (transactionType === "TRANSFER") {
            router.replace("/transfer" as any);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            {/* HEADER GRADIENT */}
            <LinearGradient colors={["#005BEA", "#00C6FB"]} style={styles.header}>
                <View style={styles.headerPlaceholder} />
                <Text style={styles.headerTitle}>Kết quả giao dịch</Text>
                <TouchableOpacity style={styles.iconBtn} onPress={handleGoHome}>
                    <Ionicons name="home-outline" size={22} color="#FFF" />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* CARD CHÍNH */}
                <View style={styles.card}>
                    {/* ICON DẤU TÍCH XANH */}
                    <View style={styles.checkIconWrapper}>
                        <LinearGradient
                            colors={["#4CAF50", "#2E7D32"]}
                            style={styles.checkIconCircle}
                        >
                            <Ionicons name="checkmark" size={32} color="#FFF" />
                        </LinearGradient>
                    </View>

                    {/* TIÊU ĐỀ & SỐ TIỀN */}
                    <Text style={styles.successStatusText}>Giao dịch thành công</Text>
                    <Text style={styles.amountText}>
                        {amount.toLocaleString("vi-VN")}đ
                    </Text>

                    {/* THÔNG BÁO TÓM TẮT */}
                    <View style={styles.infoBox}>
                        <Ionicons
                            name="information-circle-outline"
                            size={18}
                            color="#0288D1"
                            style={{ marginTop: 2 }}
                        />
                        <Text style={styles.infoText}>
                            Giao dịch đã được ghi nhận vào hệ thống. Số dư tài khoản đã được
                            cập nhật tự động.
                        </Text>
                    </View>

                    {/* THỜI GIAN THANH TOÁN */}
                    <View style={styles.timeSection}>
                        <Text style={styles.timeLabel}>Thời gian thực hiện</Text>
                        <Text style={styles.timeValue}>{transactionTime}</Text>
                    </View>

                    {/* BẢNG CHI TIẾT GIAO DỊCH */}
                    <View style={styles.detailBox}>
                        <Text style={styles.detailTitle}>Chi tiết giao dịch</Text>

                        {transactionCode ? (
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Mã giao dịch</Text>
                                <Text style={styles.detailValueBold}>{transactionCode}</Text>
                            </View>
                        ) : null}

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Nguồn tiền / Người gửi</Text>
                            <Text style={styles.detailValueBold}>{senderName}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Đích đến / Người nhận</Text>
                            <Text style={styles.detailValueBold}>{recipientName}</Text>
                        </View>
                    </View>

                    {/* NÚT THAO TÁC */}
                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity
                            style={styles.homeSecondaryBtn}
                            onPress={handleGoHome}
                        >
                            <Ionicons name="home" size={18} color="#005BEA" />
                            <Text style={styles.homeSecondaryText}>TRANG CHỦ</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 1 }}>
                            <AppButton
                                title="GIAO DỊCH MỚI"
                                onPress={handleNewTransaction}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F5F7",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    headerPlaceholder: {
        width: 24,
    },
    headerTitle: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
    },
    iconBtn: {
        padding: 2,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingTop: 40,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    checkIconWrapper: {
        marginTop: -45,
        marginBottom: 12,
    },
    checkIconCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: "#FFF",
    },
    successStatusText: {
        fontSize: 15,
        color: "#4B5563",
        fontWeight: "500",
        marginBottom: 6,
    },
    amountText: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 16,
    },
    infoBox: {
        flexDirection: "row",
        backgroundColor: "#E1F5FE",
        borderRadius: 12,
        padding: 12,
        gap: 8,
        marginBottom: 16,
        width: "100%",
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: "#0277BD",
        lineHeight: 18,
    },
    timeSection: {
        width: "100%",
        marginBottom: 16,
    },
    timeLabel: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 2,
    },
    timeValue: {
        fontSize: 14,
        color: "#1F2937",
        fontWeight: "500",
    },
    detailBox: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 14,
        padding: 14,
        marginBottom: 20,
    },
    detailTitle: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    detailLabel: {
        fontSize: 14,
        color: "#6B7280",
    },
    detailValueBold: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },
    detailValue: {
        fontSize: 14,
        color: "#111827",
    },
    actionButtonsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        width: "100%",
        marginTop: 8,
    },
    homeSecondaryBtn: {
        flex: 1,
        height: 52,
        flexDirection: "row",
        borderRadius: 16,
        backgroundColor: "#EFF6FF",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        borderWidth: 1,
        borderColor: "#BFDBFE",
    },
    homeSecondaryText: {
        color: "#005BEA",
        fontWeight: "700",
        fontSize: 13,
    },
});