import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    shadowColor: "#2072A6",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 6,
  },

  text: {
    color: "#fff",
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