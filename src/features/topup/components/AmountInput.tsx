import AppInput from "@/shared/components/AppInput";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface AmountInputProps {
    value: string;
    onChangeText: (val: string) => void;
    onClear: () => void;
    error?: string;
}

export const AmountInput = ({
    value,
    onChangeText,
    onClear,
    error,
}: AmountInputProps) => {
    return (
        <AppInput
            label="Số tiền cần nạp"
            placeholder="0 đ"
            keyboardType="numeric"
            value={value}
            onChangeText={onChangeText}
            error={error}
            rightIcon={
                value.length > 0 ? (
                    <TouchableOpacity onPress={onClear}>
                        <Ionicons name="close-circle" size={20} color="#999" />
                    </TouchableOpacity>
                ) : undefined
            }
        />
    );
};