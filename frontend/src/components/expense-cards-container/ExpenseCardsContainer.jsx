import ExpenseCard from "../expense-card/ExpenseCard";
import "./style.expense-cards-container.css";
import React from "react";
import Paginator from "../paginator/Paginator";
import Write from "../../assets/write.png";

const ExpenseCardsContainer = ({ userExpenses, removeExpense, date }) => {
  const [page, setPage] = React.useState(1);
  const perPage = 4;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentExpenses = userExpenses.slice(start, end);

  return (
    <div className="expense-cards-container">
      <div className="expense-cards-info">
        <div
          className={`title ${
            userExpenses.length > 0 ? "" : "hidden"
          }`}
        >
          <h1>
            {userExpenses.length > 0
              ? "Recent Expenses"
              : "You have no expenses"}
          </h1>
          <div className="total-paginator">
            <h2>
              {userExpenses.length > 0 ? `${userExpenses.length} Total` : ""}
            </h2>
            <Paginator
              perPage={perPage}
              array={userExpenses}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
        <div className={userExpenses.length > 0 ? "hidden" : "no-expenses"}>
          <h1>You have no expenses registered, start tracking now!</h1>
          <img src={Write} id="write"></img>
        </div>
        <div className="expense-cards">
          {currentExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              name={expense.name}
              id={expense.id}
              removeExpense={removeExpense}
              category={expense.category}
              price={expense.amount}
              date={date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCardsContainer;
