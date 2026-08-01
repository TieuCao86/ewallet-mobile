import { BankMasterResponse } from "@/features/bank/types/bank";
import { getBankLogo } from "@/features/bank/utils/bankHelper";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface BankItemProps {
    bank: BankMasterResponse;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

export default function BankItem({ bank, isSelected, onSelect }: BankItemProps) {
    return (
        <TouchableOpacity
            style={[styles.container, isSelected && styles.selectedContainer]}
            onPress={() => onSelect(bank.id)}
            activeOpacity={0.7}
        >
            <Image
                // Lấy ảnh local qua helper map file name (acb.jpg, vcb.jpg...)
                source={getBankLogo(bank.logo)}
                style={[styles.logo, isSelected && styles.selectedLogo]}
            />

            <Text
                numberOfLines={1}
                style={[styles.name, isSelected && styles.selectedName]}
            >
                {bank.name}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "25%",
        alignItems: "center",
        marginTop: 15,
        paddingVertical: 6,
        borderRadius: 12,
    },
    selectedContainer: {
        backgroundColor: "#E3F2FD", // Màu nền nhẹ khi chọn
    },
    logo: {
        width: 52,
        height: 52,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DDD",
        resizeMode: "contain",
        backgroundColor: "#FFF",
    },
    selectedLogo: {
        borderColor: "#1976D2", // Viền xanh khi chọn
        borderWidth: 2,
    },
    name: {
        marginTop: 6,
        fontSize: 12,
        color: "#333",
    },
    selectedName: {
        color: "#1976D2",
        fontWeight: "bold",
    },
});