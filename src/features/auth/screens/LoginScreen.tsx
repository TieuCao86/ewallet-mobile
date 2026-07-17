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
    View
} from "react-native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import AppButton from "@/shared/components/AppButton/AppButton";
import { styles } from "../styles/login.screen.styles";

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Chuyển thành state động

    // Chuyển hàm xử lý sang async/await bất đồng bộ để gọi API
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ email và mật khẩu.");
            return;
        }

        setLoading(true);
        try {
            // Gọi hàm login từ Context (đã cấu hình sẵn lưu token, nạp header axios)
            await login(email, password);

            // Đăng nhập thành công -> Điều hướng sang màn hình Home bên trong (tabs)
            // router.replace("/(tabs)/home");
            alert("Login thành công")
        } catch (error: any) {
            // Bắt lỗi từ server trả về (Sai mật khẩu, không tồn tại tài khoản...)
            const errorMsg = error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!";
            console.log("=== LỖI ĐĂNG NHẬP THỰC TẾ ===", error.response?.data || error.message);
            Alert.alert("Lỗi", errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            // Tối ưu import background bằng Path Alias @ sạch sẽ
            source={require("@/assets/images/login-bg.jpg")}
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
                            editable={!loading} // Khóa input khi đang gọi API
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
                            editable={!loading} // Khóa input khi đang gọi API
                        />
                    </View>

                    {/* Nút Đăng nhập / Hiệu ứng Loading */}
                    <AppButton
                        title="Đăng nhập"
                        onPress={handleLogin}
                        loading={loading}   // Tự động vô hiệu hóa và hiển thị vòng xoay loading
                        style={styles.loginButton} // Giữ nguyên style định dạng vị trí/kích thước của bạn
                    />

                    <TouchableOpacity style={styles.forgotPasswordButton} disabled={loading}>
                        <Text style={styles.forgotPasswordText}>
                            Quên mật khẩu?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerContainer}
                        onPress={() => router.push("/(auth)/register")}
                        disabled={loading}
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