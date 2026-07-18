import { Colors } from "@/shared/theme/colors";
import { Radius } from "@/shared/theme/radius";
import { Shadows } from "@/shared/theme/shadows";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: Radius.xl,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    ...Shadows.button,
  },

  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },

  disabled: {
    opacity: 0.5,
  },
});