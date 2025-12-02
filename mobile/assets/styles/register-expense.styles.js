import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  registerExpenseContainer: {
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212",
    gap: 20,
  },

  label: {
    color: "#999",
    marginBottom: 5,
  },

  pickerWrapper: {
    backgroundColor: "#222",
    borderRadius: 8,
  },

  picker: {
    color: "#FFF",
  },

  title: {
    marginLeft: 30,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },

  addButton: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#FFF",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  dateInputButton: {
    padding: 16,
    borderWidth: 1,
    boxShadow: "0 0 3px rgba(255, 255, 255, 0.5)",
    borderColor: "#333",
    color: "#FFF",
    width: 330,
    height: 50,
    borderRadius: 16,
    flex: 1,
  },
});

export default styles;
