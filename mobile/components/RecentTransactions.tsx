import { ImageSourcePropType, View, Text } from "react-native";
import TransactionCard from "./TransactionCard";
import Bus from "../assets/images/bus.png";
import Restaurant from "../assets/images/restaurant.png";
import Enterteinment from "../assets/images/enterteinment.png";
import Util from "../assets/images/util.png";
import Home from "../assets/images/home.png";
import Healthcare from "../assets/images/healthcare.png";
import Shopping from "../assets/images/shopping.png";
import Pet from "../assets/images/pet.png";
import Personal from "../assets/images/personal.png";
import Debt from "../assets/images/debt.png";
import Bills from "../assets/images/bills.png";
import Education from "../assets/images/education.png";
import Investments from "../assets/images/investments.png";
import Work from "../assets/images/work.png";
import Other from "../assets/images/other.png";
import Broke from "../assets/images/broke.png";
import styles from "@/assets/styles/home.styles";

type Expense = {
  id: string;
  name: string;
  amount: string;
  category: string;
  description: string;
  date: string;
  user_id: string;
};

type ExpenseList = Expense[];

interface RecentTransactionProps {
  expenses: ExpenseList;
}

const RecentTransactions = (props: RecentTransactionProps) => {
  function getIcon(category: string): ImageSourcePropType {
    switch (category) {
      case "food":
        return Restaurant;

      case "transportation":
        return Bus;

      case "entertainment":
        return Enterteinment;

      case "utilities":
        return Util;

      case "housing":
        return Home;

      case "health":
        return Healthcare;

      case "shopping":
        return Shopping;

      case "pets":
        return Pet;

      case "personal":
        return Personal;

      case "debt":
        return Debt;

      case "bills":
        return Bills;

      case "education":
        return Education;

      case "investments":
        return Investments;

      case "work":
        return Work;

      case "other":
        return Other;

      default:
        return Broke;
    }
  }

  function getLimitedExpenses(): ExpenseList {
    return sortByDate(props.expenses).slice(0, 4);
  }

  function sortByDate(expenses: ExpenseList): ExpenseList {
    return [...expenses].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  return (
    <View style={{ gap: 20, height: 300 }}>
      <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 18 }}>
        Recent Transactions
      </Text>
      <View className="expense-cards" style={styles.expenseCards}>
        {getLimitedExpenses().map((expense) => {
          return (
            <TransactionCard
              key={expense.id}
              name={expense.name}
              id={expense.id}
              description={expense.description}
              category={expense.category}
              amount={expense.amount}
              date={new Date(expense.date).toISOString().split("T")[0]}
              icon={getIcon(expense.category)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default RecentTransactions;
