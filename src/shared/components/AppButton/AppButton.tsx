import { Gradients } from "@/shared/theme/gradients";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    Text,
    ViewStyle,
} from "react-native";
import { styles } from "./AppButton.styles";

interface AppButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    icon?: React.ReactNode;
}

export default function AppButton({
    title,
    onPress,
    loading = false,
    disabled = false,
    style,
    icon,
}: AppButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            style={({ pressed }) => [
                //styles.button, // Giữ lại chiều cao gốc nếu style truyền vào không có
                style,           // Style custom từ ngoài truyền vào (như loginButton)
                pressed && styles.pressed,
                (disabled || loading) && styles.disabled,
            ]}
        >
            {/* Thẻ LinearGradient sẽ chiếm trọn 100% không gian và bo góc của Pressable ngoài */}
            <LinearGradient
                colors={Gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.button, { width: "100%", height: "100%" }]} 
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        {icon}
                        <Text style={styles.text}>{title}</Text>
                    </>
                )}
            </LinearGradient>
        </Pressable>
    );
}