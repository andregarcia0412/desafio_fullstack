import "./style.expense-card.css";
import Calendar from "../../assets/calendar.png";
import Tag from "../../assets/tag.png";
import Trash from "../../assets/trash.png";

const ExpenseCard = ({ name, id, category, price, date, removeExpense}) => {
  return (
    <div className="card">
      <div className="texts">
        <p id="category">
          <img src={Tag} id="tag" />
          {category}
        </p>
        <div className="name-date">
          <p id="name">{name}</p>
          <p id="date">
            <img src={Calendar} id="calendar" />
            {date}
          </p>
        </div>
      </div>
      <div className="price-button">
        <p id="price">
          R$ <span style={{ color: "#FFF" }}>{price}</span>
        </p>
        <button id="remove-btn" onClick={() => removeExpense(id)}>
          <img id="trash" src={Trash} />
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
