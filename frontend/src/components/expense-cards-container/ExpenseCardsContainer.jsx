import ExpenseCard from "../expense-card/ExpenseCard";
import "./style.expense-cards-container.css";
import React from "react";
import Paginator from "../paginator/Paginator";

const ExpenseCardsContainer = ({ userExpenses, removeExpense, patchExpense }) => {
  userExpenses = [...userExpenses].sort((a,b) => {
    const diff = new Date(b.date) - new Date(a.date)
    if(diff != 0){
      return diff
    }

    return b.id - a.id
  })
  const [page, setPage] = React.useState(1);
  const perPage = 7;
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
            
            
            return (
            <ExpenseCard
              key={expense.id}
              name={expense.name}
              id={expense.id}
              description={expense.description}
              removeExpense={removeExpense}
              patchExpense={patchExpense}
              category={expense.category}
              price={expense.amount}
              date={new Date(expense.date).toISOString().split("T")[0]}
            />
          )})}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCardsContainer;
