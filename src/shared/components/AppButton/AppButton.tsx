import React from "react";
import {
    ActivityIndicator,
    Pressable,
    Text,
    ViewStyle,
} from "react-native";

import { Gradients } from "@/shared/theme/gradients";
import { LinearGradient } from "expo-linear-gradient";
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
                pressed && styles.pressed,
                disabled && styles.disabled,
            ]}
        >
            <LinearGradient
                colors={Gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.button, style]}
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