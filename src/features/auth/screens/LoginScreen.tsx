import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { styles } from "../styles/login.screen.styles";

export default function LoginScreen() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading] = useState(false);

    const handleLogin = () => {
        Alert.alert("Thông báo", "Kết nối API ở bước sau.");
        // Sau này:
        // await login(...)
        // router.replace("/(tabs)/home");
    };

    return (
        <ImageBackground
            source={require("../../../../assets/images/login-bg.jpg")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.glassForm}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>V</Text>
                        <Text style={[styles.logoText, styles.logoTextRight]}>T</Text>
                    </View>

                    {/* Email */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="example@gmail.com"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mật khẩu</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={styles.loginButtonText}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotPasswordButton}>
                        <Text style={styles.forgotPasswordText}>
                            Quên mật khẩu?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerContainer}
                        onPress={() => router.push("/(auth)/register")}
                    >
                        <Text style={styles.registerText}>
                            Chưa có tài khoản?
                        </Text>

                        <Text style={styles.registerLink}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}