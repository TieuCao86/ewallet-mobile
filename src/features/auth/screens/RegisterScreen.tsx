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

import AppButton from "@/shared/components/AppButton/AppButton";
import authService from "../services/auth.service";
import { styles } from "../styles/login.screen.styles";

export default function RegisterScreen() {
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (
            !fullName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !password ||
            !confirmPassword
        ) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            Alert.alert("Thông báo", "Email không hợp lệ.");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            Alert.alert("Thông báo", "Số điện thoại phải gồm đúng 10 chữ số.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Thông báo", "Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Thông báo", "Mật khẩu xác nhận không khớp.");
            return;
        }

        try {
            setLoading(true);

            await authService.register({
                fullName,
                email,
                phone,
                password,
            });

            Alert.alert("Thành công", "Đăng ký thành công.", [
                {
                    text: "Đăng nhập",
                    onPress: () => router.replace("/(auth)/login"),
                },
            ]);
        } catch (error: any) {
            const message =
                error.response?.data?.message || "Đăng ký thất bại.";

            Alert.alert("Lỗi", message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require("@/assets/images/login-bg.jpg")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.glassForm}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>V</Text>
                        <Text style={[styles.logoText, styles.logoTextRight]}>T</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Họ và tên</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nguyễn Văn A"
                            placeholderTextColor="#9CA3AF"
                            value={fullName}
                            onChangeText={setFullName}
                            editable={!loading}
                        />
                    </View>

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
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="09xxxxxxxx"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Xác nhận mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            editable={!loading}
                        />
                    </View>

                    <AppButton
                        title="Đăng ký"
                        onPress={handleRegister}
                        loading={loading}
                        style={styles.loginButton}
                    />

                    <TouchableOpacity
                        style={styles.registerContainer}
                        disabled={loading}
                        onPress={() => router.replace("/(auth)/login")}
                    >
                        <Text style={styles.registerText}>Đã có tài khoản?</Text>
                        <Text style={styles.registerLink}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}