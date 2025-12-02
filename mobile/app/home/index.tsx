import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../assets/styles/home.styles";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "@/components/Card";
import PlusIcon from "@/components/PlusIcon";
import { router } from "expo-router";
import api from "@/service/api";
import RecentTransactions from "@/components/RecentTransactions";

type UserData = {
  expiresIn: number;
  token: string;
  user: User;
};

type User = {
  id: string;
  name: string;
  email: string;
};

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

const Home = () => {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [userExpenses, setUserExpenses] = React.useState<ExpenseList | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [totalExpenses, setTotalExpenses] = React.useState(0);

  React.useEffect(() => {
    async function getUserData() {
      let userDataString: string | null = await AsyncStorage.getItem(
        "user_data"
      );

      if (!userDataString) {
        router.replace("/(auth)");
        return;
      }

      setUserData(JSON.parse(userDataString));
      setUserName(JSON.parse(userDataString).user.name);

      return JSON.parse(userDataString);
    }

    async function init() {
      const data = await getUserData();
      if (data && data.user && data.user.id) {
        await getExpenses(data.user.id);
      }
      setLoading(false);
    }

    init();
  }, []);

  React.useEffect(() => {
    if (!loading) {
      if (!userData) {
        router.push("/(auth)");
        return;
      }
    }
  }, [userData]);

  React.useEffect(() => {
    if (!loading) {
      setUserExpenses(userExpenses);
    }
  }, [userExpenses]);

  async function getExpenses(userId: string) {
    const response = await api.get(`/expense/${userId}`);
    let sum = 0;
    for (let i = 0; i < response.data.length; i++) {
      sum += Number(response.data[i].amount);
    }

    setTotalExpenses(sum);
    setUserExpenses(response.data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={{ color: "#999" }}>Welcome Back,</Text>
          <Text style={{ color: "#FFF", fontSize: 24, fontWeight: "bold" }}>
            {userName}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logout}
          activeOpacity={0.7}
          onPress={async () => {
            await AsyncStorage.clear();
            router.replace("/(auth)");
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      <Card>
        <Text style={{ color: "#999", fontSize: 12 }}>Total expenses</Text>
        <Text style={{ color: "#FFF", fontSize: 36, fontWeight: "bold" }}>
          {totalExpenses.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </Card>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.registerExpense}
        onPress={() => router.push("/register-expense")}
      >
        <PlusIcon />
        <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>
          Register expense
        </Text>
      </TouchableOpacity>

      {userExpenses && <RecentTransactions expenses={userExpenses} />}
    </View>
  );
};

export default Home;
