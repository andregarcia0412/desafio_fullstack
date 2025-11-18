import React from "react";
import api from "../../services/api.js";
import ExpenseCardsContainer from "../../components/expense-cards-container/ExpenseCardsContainer.jsx";
import "./style.css";
import RegisterExpenseCard from "../../components/register-expense-card/RegisterExpenseCard.jsx";

const Home = ({}) => {
  const nameInput = React.useRef();
  const priceInput = React.useRef();
  const categoryInput = React.useRef();
  const descriptionInput = React.useRef();

  const [userExpenses, setUserExpenses] = React.useState([]);
  const [date, setDate] = React.useState();

  const userData = JSON.parse(localStorage.getItem("user_data"))?.user;
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  React.useEffect(() => {
    if (!localStorage.getItem("user_data")) {
      window.location.href = "/auth";
    }
    getExpenses();
  }, []);

  async function createExpense() {
    await api.post("/expense", {
      name: nameInput.current.value,
      category: categoryInput.current.value,
      description: descriptionInput.current.value,
      amount: Number(priceInput.current.value),
      user_id: userData.id,
    });
  }

  async function getExpenses() {
    const res = await api.get(`/expense/${userData.id}`);
    setDate(
      new Intl.DateTimeFormat("en-us", dateOptions).format(res.data.date)
    );
    setUserExpenses(res.data);
  }

  async function removeExpense(id) {
    await api.delete(`/expense/${id}`);
    getExpenses();
  }

  return (
    <div>
      <RegisterExpenseCard/>

      <ExpenseCardsContainer
        removeExpense={removeExpense}
        userExpenses={userExpenses}
        date={date}
      />

      <div>
        <input placeholder="nome" ref={nameInput}></input>
        <input placeholder="description" ref={descriptionInput}></input>
        <input placeholder="category" ref={categoryInput}></input>
        <input placeholder="price" ref={priceInput}></input>
        <button
          type="button"
          onClick={async () => {
            await createExpense();
            await getExpenses();
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Home;
