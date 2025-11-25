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
import LineChartComponent from "../../components/line-chart/LineChart.jsx";

const Home = ({}) => {
  const [newExpenseIsClosed, setNewExpenseClosed] = React.useState(true);
  const [userExpenses, setUserExpenses] = React.useState([]);
  const [totalSpent, setTotalSpent] = React.useState(0);
  const [ToastIsVisible, setToastVisible] = React.useState(false);
  const [shouldShowToast, setShouldShowToast] = React.useState(false);
  const [dailyAvg, setDailyAvg] = React.useState(0);

  const userData = JSON.parse(localStorage.getItem("user_data"))?.user;

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
    let monthlySum = 0;
    const today = new Date();

    for (let i = 0; i < res.data.length; i++) {
      const date = new Date(res.data[i].date);
      sum += Number(res.data[i].amount);

      if (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() == today.getFullYear()
      ) {
        monthlySum += Number(res.data[i].amount);
      }
    }

    setDailyAvg(monthlySum / 30);
    setTotalSpent(sum);
  }

  async function removeExpense(id) {
    await api.delete(`/expense/${id}`);
    getExpenses();
  }

  async function patchExpense(id, body){
    await api.patch(`/expense/${id}`, {...body, user_id: userData.id});
    getExpenses();
  }

  return (
    <div>
      <HomeHeader btnOnClick={() => setNewExpenseClosed(false)} userName={userData.name}/>
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
            title={totalSpent.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
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
            title={dailyAvg.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
            subtitle="This month's daily average"
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

        <div className="info-wrapper">
          <div className="home-charts">
            <ChartCard chart={<BarChartComponent infoArr={userExpenses} />} />
            <ChartCard chart={<LineChartComponent infoArr={userExpenses} />} />
          </div>
          <ExpenseCardsContainer
            removeExpense={removeExpense}
            userExpenses={userExpenses}
            patchExpense={patchExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
