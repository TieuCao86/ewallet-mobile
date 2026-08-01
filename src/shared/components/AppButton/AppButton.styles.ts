import { Colors } from "@/shared/theme/colors";
import { Radius } from "@/shared/theme/radius";
import { Shadows } from "@/shared/theme/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pressableContainer: {
    width: "100%",
    borderRadius: Radius.xl,
    overflow: "hidden", // Bắt buộc: để LinearGradient bo tròn chuẩn theo góc nút
  },

  gradientButton: {
    height: 52,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    ...Shadows.button,
  },

  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },

  disabled: {
    opacity: 0.5,
  },
});