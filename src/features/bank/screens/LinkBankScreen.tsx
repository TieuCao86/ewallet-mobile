import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BankGrid from "@/features/bank/components/BankGrid";
import BankSearch from "@/features/bank/components/BankSearch";
import { useLinkBank } from "@/features/bank/hooks/useBankLink";
import { useMasterBanks } from "@/features/bank/hooks/useMasterBanks";
import PrimaryButton from "@/shared/components/AppButton";
import AppInput from "@/shared/components/AppInput";

export default function LinkBankScreen() {
    const { data: masterBanks = [], isLoading } = useMasterBanks();
    const { mutate, isPending } = useLinkBank();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const filteredBanks = useMemo(() => {
        if (!searchQuery.trim()) {
            return masterBanks;
        }

        const keyword = searchQuery.toLowerCase();

        return masterBanks.filter(
            (bank) =>
                bank.name.toLowerCase().includes(keyword) ||
                bank.code.toLowerCase().includes(keyword)
        );
    }, [masterBanks, searchQuery]);

    const onSubmit = () => {
        if (!selectedBankId) {
            Alert.alert("Thông báo", "Vui lòng chọn ngân hàng");
            return;
        }

        mutate(
            {
                bankId: selectedBankId,
                accountNumber: accountNumber.trim(),
                phone: phone.trim(),
            },
            {
                onSuccess: () => {
                    Alert.alert("Thành công", "Liên kết ngân hàng thành công");
                },
                onError: (error: any) => {
                    Alert.alert(
                        "Lỗi",
                        error?.response?.data?.message || "Liên kết thất bại"
                    );
                },
            }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Liên kết ngân hàng</Text>

                {/* Thanh tìm kiếm ngân hàng */}
                <BankSearch value={searchQuery} onChangeText={setSearchQuery} />

                {/* Danh sách ngân hàng */}
                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#1976D2"
                        style={styles.loader}
                    />
                ) : (
                    <BankGrid
                        banks={filteredBanks}
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
                        <MaterialCommunityIcons name="bank" size={22} color="#1976D2" />
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
                        <MaterialCommunityIcons name="phone" size={22} color="#1976D2" />
                    }
                />

                {/* Button Submit */}
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        title={isPending ? "ĐANG XỬ LÝ..." : "LIÊN KẾT TÀI KHOẢN"}
                        onPress={onSubmit}
                        disabled={isPending}
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