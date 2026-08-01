import { BANK_LOGOS, DEFAULT_BANK_LOGO } from "@/features/bank/constants/bankLogos";
import { BankResponse } from "@/features/bank/types/bank";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface PaymentSourcePickerProps {
    banks: BankResponse[];
    loading: boolean;
    selectedBankId: number | null;
    onSelectBank: (id: number) => void;
    onAddBank: () => void;
}

export const PaymentSourcePicker = ({
    banks,
    loading,
    selectedBankId,
    onSelectBank,
    onAddBank,
}: PaymentSourcePickerProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tài khoản/Thẻ liên kết</Text>
                <TouchableOpacity>
                    <Text style={styles.feeText}>Biểu phí</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator
                    size="small"
                    color="#1976D2"
                    style={{ marginVertical: 20 }}
                />
            ) : (
                banks.map((bank) => {
                    const isSelected =
                        selectedBankId === bank.id ||
                        (!selectedBankId && banks[0]?.id === bank.id);

                    return (
                        <TouchableOpacity
                            key={bank.id}
                            style={[
                                styles.paymentCard,
                                isSelected && styles.paymentCardActive,
                            ]}
                            onPress={() => onSelectBank(bank.id)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.paymentLeft}>
                                <View style={styles.bankLogo}>
                                    {bank.logo ? (
                                        <Image
                                            source={
                                                BANK_LOGOS[bank.logo]
                                                    ? BANK_LOGOS[bank.logo]
                                                    : DEFAULT_BANK_LOGO
                                            }
                                            style={styles.logoImage}
                                            resizeMode="contain"
                                        />
                                    ) : (
                                        <Ionicons
                                            name="card-outline"
                                            size={24}
                                            color="#1976D2"
                                        />
                                    )}
                                </View>
                                <View>
                                    <Text style={styles.bankName}>
                                        {bank.bankName || "Ngân hàng"}
                                    </Text>
                                    <Text style={styles.bankSub}>
                                        STK: ****{bank.accountNumber?.slice(-4)}
                                    </Text>
                                </View>
                            </View>

                            <Ionicons
                                name={isSelected ? "radio-button-on" : "radio-button-off"}
                                size={24}
                                color={isSelected ? "#8E24AA" : "#CCC"}
                            />
                        </TouchableOpacity>
                    );
                })
            )}

            <TouchableOpacity
                style={styles.addBankCard}
                onPress={onAddBank}
                activeOpacity={0.8}
            >
                <View style={styles.paymentLeft}>
                    <View style={styles.addIconBox}>
                        <Feather name="plus-square" size={22} color="#8E24AA" />
                    </View>
                    <View>
                        <Text style={styles.bankName}>Thêm ngân hàng liên kết</Text>
                        <Text style={styles.bankSub}>Miễn phí nạp, rút tiền</Text>
                    </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1A1A1A",
    },
    feeText: {
        fontSize: 13,
        color: "#8E24AA",
        fontWeight: "600",
    },
    paymentCard: {
        backgroundColor: "#FFF",
        borderRadius: 14,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: "transparent",
    },
    paymentCardActive: {
        borderColor: "#8E24AA",
    },
    paymentLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    logoImage: {
        width: 32,
        height: 32,
        borderRadius: 6,
    },
    bankLogo: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: "#E3F2FD",
        alignItems: "center",
        justifyContent: "center",
    },
    bankName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#1A1A1A",
    },
    bankSub: {
        fontSize: 11,
        color: "#666",
        marginTop: 2,
    },
    addBankCard: {
        backgroundColor: "#FFF",
        borderRadius: 14,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    addIconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#8E24AA",
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center",
    },
});