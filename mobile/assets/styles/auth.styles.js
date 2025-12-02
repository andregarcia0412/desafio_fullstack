import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    color: "#FFF",
    backgroundColor: "#000",
    gap: 20,
    flexGrow: 1,
  },

  inputsWrapper: {
    gap: 20,
  },

  inputContainer: {
    gap: 10,
  },

  textInput: {
    padding: 16,
    borderWidth: 1,
    boxShadow: "0 0 3px rgba(255, 255, 255, 0.5)",
    borderColor: "#333",
    color: "#FFF",
    width: 330,
    height: 50,
    borderRadius: 16,
  },

  passwordInput: {
    paddingRight: 52,
  },

  passwordContainer: {
    position: "relative",
    width: 330,
    justifyContent: "center",
  },

  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 50,
    padding: 4,
    transform: [{ translateY: -10 }],
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    padding: 10,
    color: "#000",
    borderRadius: 12,
    width: 330,
    height: 55,
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },

  title: {
    alignItems: "left",
    width: "86%",
  },

  formWrapper: {
    gap: 25,
  },

  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  link: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  radioButtonLinkWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    gap: 20,
  },
});

export default styles;
