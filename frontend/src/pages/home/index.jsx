import React from "react";
import api from "../../services/api.js";
import ExpenseCardsContainer from "../../components/expense-cards-container/ExpenseCardsContainer.jsx";
import "./style.css";
import RegisterExpenseCard from "../../components/register-expense-card/RegisterExpenseCard.jsx";
import NeonCard from "../../components/neon-card/NeonCard.jsx";
import Money from "../../assets/money.svg";
import TrendingDown from "../../assets/trending_down.svg";
import CalendarGreen from "../../assets/calendar_green.svg";
import HomeHeader from "../../components/home-header/HomeHeader.jsx";
import Toast from "../../components/toast/Toast.jsx";
import BarChartComponent from "../../components/bar-chart/BarChart.jsx";
import ChartCard from "../../components/chart-card/ChartCard.jsx";
import LineChartComponent from "../../components/line-chart/LineChart.jsx"

const Home = ({}) => {
  const [newExpenseIsClosed, setNewExpenseClosed] = React.useState(true);
  const [userExpenses, setUserExpenses] = React.useState([]);
  const [totalSpent, setTotalSpent] = React.useState(0);
  const [ToastIsVisible, setToastVisible] = React.useState(false);
  const [shouldShowToast, setShouldShowToast] = React.useState(false);

  const userData = JSON.parse(localStorage.getItem("user_data"))?.user;

  let month = new Date().toLocaleDateString("en-US", { month: "short" });

  React.useEffect(() => {
    if (!localStorage.getItem("user_data")) {
      window.location.href = "/auth";
    }
    getExpenses();
  }, []);

  async function createExpense(name, category, description = "", amount, date) {
    try {
      await api.post("/expense", {
        name: name,
        category: category,
        description: description,
        amount: Number(amount),
        date: date,
        user_id: userData.id,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function getExpenses() {
    const res = await api.get(`/expense/${userData.id}`);
    setUserExpenses(res.data);
    let sum = 0;
    for (let i = 0; i < res.data.length; i++) {
      sum += Number(res.data[i].amount);
    }
    setTotalSpent(sum);
  }

  async function removeExpense(id) {
    await api.delete(`/expense/${id}`);
    getExpenses();
  }

  return (
    <div>
      <HomeHeader btnOnClick={setNewExpenseClosed} />
      {shouldShowToast && (
        <Toast
          text={"Expense Added"}
          isVisible={ToastIsVisible}
          setVisible={setToastVisible}
          setShoulShowToast={setShouldShowToast}
        />
      )}
      <div className="home-container">
        <div className="neon-cards">
          <NeonCard
            icon={Money}
            title={totalSpent.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            subtitle="Total expenses"
            color="blue"
          />
          <NeonCard
            icon={TrendingDown}
            title={userExpenses.length}
            subtitle="Transactions"
            color="purple"
          />
          <NeonCard
            icon={CalendarGreen}
            title={month}
            subtitle="This month"
            color="green"
          />
        </div>

        <div className={newExpenseIsClosed ? "hidden" : ""}>
          <RegisterExpenseCard
            btnOnClick={async (name, category, description, amount, date) => {
              await createExpense(name, category, description, amount, date);
              await getExpenses();
            }}
            onClose={setNewExpenseClosed}
            onCloseToast={() => {
              setNewExpenseClosed(true);
              setShouldShowToast(true);
              setToastVisible(true);
            }}
          />
        </div>

        <ChartCard chart={<BarChartComponent infoArr={userExpenses} />} />
        <ChartCard chart={<LineChartComponent infoArr={userExpenses} />} />
        <ExpenseCardsContainer
          removeExpense={removeExpense}
          userExpenses={userExpenses}
        />
      </div>
    </div>
  );
};

export default Home;
