import ExpenseCard from "../expense-card/ExpenseCard";
import "./style.expense-cards-container.css";
import React from "react";
import Paginator from "../paginator/Paginator";

const ExpenseCardsContainer = ({ userExpenses, removeExpense }) => {
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const [page, setPage] = React.useState(1);
  const perPage = 4;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentExpenses = userExpenses.slice(start, end);

  return (
    <div className="expense-cards-container">
      <div className="expense-cards-info">
        <div
          className="title"
          style={userExpenses.length > 0 ? {} : { gap: "186px" }}
        >
          <h1>Recent Expenses</h1>
          <div className="total-paginator">
            <h2>{userExpenses.length} Total</h2>
            <Paginator
              perPage={perPage}
              array={userExpenses}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
        <div className="expense-cards">
          {currentExpenses.map((expense) => {
            const date = new Date(expense.date)
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

            const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(date)
            
            return (
            <ExpenseCard
              key={expense.id}
              name={expense.name}
              id={expense.id}
              removeExpense={removeExpense}
              category={expense.category}
              price={expense.amount}
              date={formattedDate}
            />
          )})}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCardsContainer;
