import { Ionicons } from "@expo/vector-icons";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { BankResponse } from "@/features/bank/types/bank";

interface BankPickerProps {
    title?: string;

    banks: BankResponse[];

    loading?: boolean;

    selectedBankAccountId: number | null;

    onSelectBankAccount: (bankId: number) => void;

    onAddBank?: () => void;
}

export default function BankPicker({
    title = "Tài khoản ngân hàng",
    banks,
    loading = false,
    selectedBankAccountId,
    onSelectBankAccount,
    onAddBank,
}: BankPickerProps) {
    return (
        <View style={styles.card}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    {title}
                </Text>


                {onAddBank && (
                    <TouchableOpacity
                        onPress={onAddBank}
                    >
                        <Text style={styles.addText}>
                            + Liên kết
                        </Text>
                    </TouchableOpacity>
                )}
            </View>


            {/* LOADING */}
            {loading ? (
                <ActivityIndicator
                    style={{
                        marginVertical: 20,
                    }}
                />

            ) : banks.length === 0 ? (

                <Text style={styles.empty}>
                    Chưa có tài khoản ngân hàng
                </Text>

            ) : (

                banks.map((bank) => {

                    const selected =
                        selectedBankAccountId === bank.bankAccountId;


                    return (
                        <TouchableOpacity
                            key={bank.bankAccountId}
                            style={[
                                styles.item,
                                selected &&
                                styles.selected,
                            ]}
                            onPress={() =>
                                onSelectBankAccount(bank.bankAccountId)
                            }
                        >

                            <View style={styles.left}>

                                <View style={styles.iconBox}>
                                    <Ionicons
                                        name="card-outline"
                                        size={22}
                                        color="#005BEA"
                                    />
                                </View>


                                <View>
                                    <Text
                                        style={styles.bankName}
                                    >
                                        {bank.bankName}
                                    </Text>


                                    <Text
                                        style={styles.account}
                                    >
                                        {bank.accountNumber}
                                    </Text>
                                </View>

                            </View>


                            {
                                selected && (
                                    <Ionicons
                                        name={
                                            selected
                                                ? "radio-button-on"
                                                : "radio-button-off"
                                        }
                                        size={24}
                                        color={
                                            selected
                                                ? "#005BEA"
                                                : "#999"
                                        }
                                    />
                                )
                            }

                        </TouchableOpacity>
                    );
                })
            )}

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },


    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },


    title: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111",
    },


    addText: {
        color: "#005BEA",
        fontWeight: "600",
    },


    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingVertical: 14,

        borderBottomWidth:
            StyleSheet.hairlineWidth,

        borderBottomColor: "#EEE",
    },


    selected: {
        backgroundColor: "#F5FAFF",
        borderRadius: 12,
        paddingHorizontal: 8,
    },


    left: {
        flexDirection: "row",
        alignItems: "center",
    },


    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#EAF5FF",

        justifyContent: "center",
        alignItems: "center",

        marginRight: 12,
    },


    bankName: {
        fontSize: 15,
        fontWeight: "600",
    },


    account: {
        marginTop: 3,
        fontSize: 13,
        color: "#666",
    },


    empty: {
        color: "#999",
        textAlign: "center",
        paddingVertical: 20,
    },

});