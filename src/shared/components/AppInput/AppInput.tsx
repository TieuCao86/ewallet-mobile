import React from "react";
import {
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

import { styles } from "./AppInput.styles";

interface AppInputProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export default function AppInput({
    label,
    error,
    leftIcon,
    rightIcon,
    style,
    ...props
}: AppInputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View
                style={[
                    styles.inputContainer,
                    error && styles.inputError,
                ]}
            >
                {leftIcon && (
                    <View style={styles.iconLeft}>
                        {leftIcon}
                    </View>
                )}

                <TextInput
                    {...props}
                    placeholderTextColor="#999"
                    style={[styles.input, style]}
                />

                {rightIcon && (
                    <View style={styles.iconRight}>
                        {rightIcon}
                    </View>
                )}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}