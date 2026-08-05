import { Ionicons } from "@expo/vector-icons";
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { styles } from "./TransactionPinOtpModal.styles";

interface TransactionPinOtpModalProps {
  visible: boolean;
  step: "IDLE" | "PIN" | "OTP";
  pin: string;
  otp: string;
  submitting?: boolean;
  countdown?: number;
  canResend?: boolean;
  onChangePin: (value: string) => void;
  onChangeOtp: (value: string) => void;
  onSubmitPin: () => void;
  onSubmitOtp: () => void;
  onResendOtp?: () => void;
  onClose: () => void;
}

export default function TransactionPinOtpModal({
  visible,
  step,
  pin,
  otp,
  submitting = false,
  countdown = 60,
  canResend = false,
  onChangePin,
  onChangeOtp,
  onSubmitPin,
  onSubmitOtp,
  onResendOtp,
  onClose,
}: TransactionPinOtpModalProps) {
  if (step === "IDLE") {
    return null;
  }

  const isPinInvalid = submitting || pin.length !== 6;
  const isOtpInvalid = submitting || otp.length !== 6;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {step === "PIN" ? "Nhập mã PIN giao dịch" : "Nhập mã OTP"}
            </Text>

            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* PIN STEP */}
          {step === "PIN" && (
            <>
              <Text style={styles.description}>
                Vui lòng nhập mã PIN để tiếp tục
              </Text>

              <TextInput
                value={pin}
                onChangeText={onChangePin}
                keyboardType="number-pad"
                secureTextEntry
                maxLength={6}
                placeholder="••••••"
                style={styles.input}
              />

              <TouchableOpacity
                disabled={isPinInvalid}
                style={[styles.button, isPinInvalid && styles.buttonDisabled]}
                onPress={onSubmitPin}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  {submitting ? "Đang xác nhận..." : "Tiếp tục"}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* OTP STEP */}
          {step === "OTP" && (
            <>
              <Text style={styles.description}>
                Mã OTP đã được gửi tới số điện thoại của bạn
              </Text>

              <TextInput
                value={otp}
                onChangeText={onChangeOtp}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="Nhập OTP"
                style={styles.input}
              />

              <TouchableOpacity
                disabled={isOtpInvalid}
                style={[styles.button, isOtpInvalid && styles.buttonDisabled]}
                onPress={onSubmitOtp}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  {submitting ? "Đang xử lý..." : "Xác nhận"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!canResend}
                onPress={onResendOtp}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.resend,
                    !canResend && styles.resendDisabled,
                  ]}
                >
                  {canResend ? "Gửi lại OTP" : `Gửi lại sau ${countdown}s`}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}