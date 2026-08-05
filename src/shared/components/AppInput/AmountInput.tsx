import { Ionicons } from "@expo/vector-icons";
import AppInput from "./AppInput";

interface AmountInputProps {
    value: string;
    onChangeText: (value: string) => void;
    onClear?: () => void;
}

export function AmountInput({
    value,
    onChangeText,
    onClear,
}: AmountInputProps) {

    return (
        <AppInput
            label="Số tiền"
            value={formatAmount(value)}
            keyboardType="numeric"
            placeholder="Nhập số tiền"
            leftIcon={
                <Ionicons
                    name="cash-outline"
                    size={22}
                    color="#666"
                />
            }
            rightIcon={
                value ? (
                    <Ionicons
                        name="close-circle"
                        size={22}
                        color="#999"
                        onPress={onClear}
                    />
                ) : undefined
            }
            onChangeText={(text) => {
                const number =
                    text.replace(/\D/g, "");

                onChangeText(number);
            }}
        />
    );
}


function formatAmount(value: string) {

    if (!value)
        return "";

    return Number(value)
        .toLocaleString("vi-VN");
}