import React from "react";
import api from "../../services/api.js";
import ExpenseCardsContainer from "../../components/expense-cards-container/ExpenseCardsContainer.jsx";
import "./style.css";
import RegisterExpenseCard from "../../components/register-expense-card/RegisterExpenseCard.jsx";

const Home = ({}) => {
  const [newExpenseIsClosed, setNewExpenseClosed] = React.useState(false);
  const [userExpenses, setUserExpenses] = React.useState([]);

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
    console.log(res.data);
    setUserExpenses(res.data);
  }

  async function removeExpense(id) {
    await api.delete(`/expense/${id}`);
    getExpenses();
  }

  return (
    <div>
      <div className={newExpenseIsClosed ? "hidden" : ""}>
        <RegisterExpenseCard
          btnOnClick={async (name, category, description, amount, date) => {
            await createExpense(name, category, description, amount, date);
            await getExpenses();
          }}
          onClose={setNewExpenseClosed}
        />
      </div>

      <ExpenseCardsContainer
        removeExpense={removeExpense}
        userExpenses={userExpenses}
      />
    </div>
  );
};

export default Home;
