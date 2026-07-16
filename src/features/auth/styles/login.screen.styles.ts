import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  glassForm: {
    width: "100%",
    maxWidth: 360,

    backgroundColor: "rgba(255,255,255,0.82)",

    borderRadius: 20,

    paddingHorizontal: 24,
    paddingVertical: 30,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,

    elevation: 10,
  },

  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 35,
  },

  logoText: {
    fontSize: 54,
    fontWeight: "900",
    color: "#002B7F",

    transform: [
      {
        skewX: "-10deg",
      },
    ],
  },

  logoTextRight: {
    color: "#0A74DA",
    marginLeft: -6,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",

    color: "#374151",

    marginBottom: 8,
  },

  input: {
    height: 50,

    borderRadius: 12,

    paddingHorizontal: 16,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#D1D5DB",

    color: "#111827",

    fontSize: 15,
  },

  loginButton: {
    marginTop: 12,

    height: 50,

    borderRadius: 25,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#002B7F",

    shadowColor: "#002B7F",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 6,
  },

  loginButtonText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 16,
  },

  forgotPasswordButton: {
    marginTop: 18,

    alignItems: "center",
  },

  forgotPasswordText: {
    color: "#2563EB",

    fontSize: 14,

    fontWeight: "600",
  },

  registerContainer: {
    marginTop: 24,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",
  },

  registerText: {
    color: "#6B7280",

    fontSize: 14,
  },

  registerLink: {
    marginLeft: 5,

    color: "#002B7F",

    fontWeight: "700",

    fontSize: 14,
  },
});