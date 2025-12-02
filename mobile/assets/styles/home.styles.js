import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    color: "#FFF",
    backgroundColor: "#000",
    gap: 20,
    padding: 30,
  },

  title: {
    alignSelf: "flex-start",
  },

  card: {
    width: "100%",
    height: 120,
    padding: 30,
    borderRadius: 16,
    backgroundColor: "#27272a",
    justifyContent: "center",
  },

  registerExpense: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 120,
    padding: 30,
    borderRadius: 16,
    backgroundColor: "#27272A",
    justifyContent: "center",
    gap: 15,
  },

  plusContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    height: 32,
    width: 32,
    borderRadius: 16,
  },

  transactionCard: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },

  iconTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  cardIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#27272A",
    height: 48,
    width: 48,
    borderRadius: 24,
  },

  expenseCards:{
    alignItems:"center",
    justifyContent:"center",
    gap:20
  },

  header:{
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row",
    width:"100%",
  },

  logout:{
    backgroundColor:"#FFF",
    borderRadius:24,
    padding:10,
  }
});

export default styles;
