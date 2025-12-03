import "./style.expense-card.css";
import Calendar from "../../assets/calendar.png";
import Tag from "../../assets/tag.png";
import Trash from "../../assets/trash.png";
import Edit from "../../assets/edit.svg";
import RegisterExpenseCard from "../register-expense-card/RegisterExpenseCard";
import React from "react";

const ExpenseCard = ({
  name,
  id,
  category,
  price,
  date,
  description,
  removeExpense,
  patchExpense,
}) => {
  const [RegisterExpenseCardClosed, setRegisterExpenseCardClosed] =
    React.useState(true);

  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const dateToFormat = new Date(date);
  dateToFormat.setMinutes(
    dateToFormat.getMinutes() + dateToFormat.getTimezoneOffset()
  );
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    dateToFormat
  );

  return (
    <div>
      {!RegisterExpenseCardClosed && (
        <RegisterExpenseCard
          onClose={() => setRegisterExpenseCardClosed(true)}
          btnOnClick={(values) => {
            patchExpense(id, values);
          }}
          isEditCard={true}
          h1Text="Edit Expense"
          btnText="Edit Expense"
          placeholders={[
            "Edit expense name",
            "Edit expense amount",
            "Edit expense category",
            "Edit expense description",
          ]}
          values={[
            name,
            price,
            {
              label: category[0].toUpperCase() + category.substring(1),
              value: category,
            },
            description,
            date,
          ]}
        />
      )}
      <div className="card">
        <div className="texts">
          <p id="category">
            <img src={Tag} id="tag" />
            {category[0].toUpperCase() + category.substring(1)}
          </p>
          <div className="name-date">
            <p id="name" style={{ textWrap: "pretty" }}>
              {name}
            </p>
            <p id="date">
              <img src={Calendar} id="calendar" />
              {formattedDate}
            </p>
          </div>
        </div>
        <div className="price-button">
          <p id="price" style={{ textWrap: "pretty" }}>
            $ <span style={{ color: "#FFF" }}>{Number(price).toFixed(2)}</span>
          </p>
          <div className="card-btns">
            <button
              className="expense-card-btn"
              id="edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                setRegisterExpenseCardClosed(false);
              }}
            >
              <img className="expense-card-btn-img" src={Edit} />
            </button>

            <button
              className="expense-card-btn"
              id="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                removeExpense(id);
              }}
            >
              <img className="expense-card-btn-img" src={Trash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
