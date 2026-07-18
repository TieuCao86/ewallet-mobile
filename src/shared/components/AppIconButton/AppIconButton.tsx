import { Colors } from "@/shared/theme/colors";
import { Gradients } from "@/shared/theme/gradients";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./AppIconButton.styles";

interface AppIconButtonProps {
    iconName: any;
    title: string;
    onPress?: () => void;
    variant?: "circle-blue" | "grid-card";
}

export function AppIconButton({
    iconName,
    title,
    onPress,
    variant = "circle-blue",
}: AppIconButtonProps) {
    const isCard = variant === "grid-card";

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isCard ? styles.cardContainer : styles.circleContainer,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {isCard ? (
                <View style={styles.iconBoxCard}>
                    <MaterialCommunityIcons
                        name={iconName}
                        size={28}
                        color={Colors.primary}
                    />
                </View>
            ) : (
                <LinearGradient
                    colors={Gradients.primary}
                    style={styles.circleGradient}
                >
                    <MaterialCommunityIcons
                        name={iconName}
                        size={24}
                        color={Colors.white}
                    />
                </LinearGradient>
            )}

            <Text
                style={isCard ? styles.titleCard : styles.titleCircle}
                numberOfLines={2}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}