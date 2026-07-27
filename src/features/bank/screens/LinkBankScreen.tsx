import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Hooks & Components
import PrimaryButton from "@/shared/components/AppButton";
import AppInput from "@/shared/components/AppInput";
import BankGrid from "../components/BankGrid";
import BankSearch from "../components/BankSearch";
import { useBankLink } from "../hooks/useBankLink";

export default function LinkBankScreen() {
    // 1. Thêm () để thực thi hook
    const {
        masterBanks,
        loading,
        submitting,
        searchQuery,
        setSearchQuery,
        handleLinkBank,
    } = useBankLink();

    const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const onSubmit = () => {
        handleLinkBank({
            bankId: selectedBankId!,
            accountNumber,
            phone,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Liên kết ngân hàng</Text>

                {/* Thanh tìm kiếm ngân hàng */}
                <BankSearch value={searchQuery} onChangeText={setSearchQuery} />

                {/* Danh sách ngân hàng */}
                {loading ? (
                    <ActivityIndicator size="large" color="#1976D2" style={styles.loader} />
                ) : (
                    <BankGrid
                        banks={masterBanks}
                        selectedId={selectedBankId}
                        onSelectBank={setSelectedBankId}
                    />
                )}

                <Text style={styles.note}>
                    Chọn ngân hàng hoặc tìm kiếm phía trên
                </Text>

                <Text style={styles.section}>Nhập Thông Tin Liên Kết</Text>

                {/* Số tài khoản */}
                <AppInput
                    label="Số tài khoản"
                    placeholder="Nhập số tài khoản"
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                    keyboardType="numeric"
                    leftIcon={
                        <MaterialCommunityIcons
                            name="bank"
                            size={22}
                            color="#1976D2"
                        />
                    }
                />

                {/* Số điện thoại */}
                <AppInput
                    label="Số điện thoại"
                    placeholder="Nhập SĐT đăng ký tại ngân hàng"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    leftIcon={
                        <MaterialCommunityIcons
                            name="phone"
                            size={22}
                            color="#1976D2"
                        />
                    }
                />

                {/* Button Submit */}
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        title={submitting ? "ĐANG XỬ LÝ..." : "LIÊN KẾT TÀI KHOẢN"}
                        onPress={onSubmit}
                        disabled={submitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    scrollContent: {
        paddingBottom: 30,
    },
    title: {
        color: "#0D47A1",
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 15,
    },
    section: {
        fontWeight: "bold",
        fontSize: 16,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
        color: "#333",
    },
    note: {
        textAlign: "center",
        marginTop: 12,
        color: "#666",
        fontSize: 12,
    },
    loader: {
        marginVertical: 20,
    },
    buttonContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
});