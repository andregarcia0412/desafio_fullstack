import "./style.register-expense-card.css";
import React from "react";
import CategorySelect from "../../components/select/Select.jsx";
import Close from "../../assets/close.png";

const RegisterExpenseCard = ({ btnOnClick, onClose, onCloseToast }) => {
  const nameInput = React.useRef();
  const descriptionInput = React.useRef();
  const categoryInput = React.useRef();
  const amountInput = React.useRef();
  const dateInput = React.useRef();

  let today = new Date().toISOString().split("T")[0];

  const [errorMessage, setErrorMessage] = React.useState("");

  let name, amount, description, date, category;

  const selectOptions = [
    { value: "food", label: "Food" },
    { value: "transportation", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "utilities", label: "Utilities" },
    { value: "rent", label: "Rent" },
    { value: "healthcare", label: "Healthcare" },
    { value: "shopping", label: "Shopping" },
    { value: "other", label: "Other" },
  ];

  function validateFields() {
    name = nameInput.current.value.trim();
    amount = amountInput.current.value.replace(",", ".");
    description = descriptionInput.current.value.trim();
    date = dateInput.current.value;
    category = categoryInput.current.getValue()[0]?.value;

    if (!name) {
      return {
        ok: false,
        message: "Name is required",
        culprit: nameInput.current,
      };
    }

    if (!amount) {
      return {
        ok: false,
        message: "Amount is required",
        culprit: amountInput.current,
      };
    }
    if (isNaN(Number(amount))) {
      return {
        ok: false,
        message: "Insert a number",
        culprit: amountInput.current,
      };
    }

    if (amount.length > 10) {
      return {
        ok: false,
        message: "Insert a number smaller than 99999999.99",
        culprit: amountInput.current,
      };
    }

    if (Number(amount) < 0) {
      return {
        ok: false,
        message: "Insert a positive number",
        culprit: amountInput.current,
      };
    }

    if (!category || categoryInput.current.getValue()[0]?.value == null) {
      setErrorMessage("Category is required");
      return {
        ok: false,
        message: "Category is required",
        culprit: categoryInput.current,
      };
    }

    if (!description) {
      description = "";
    }

    if (!date) {
      return {
        ok: false,
        message: "Date is required",
        culprit: dateInput.current,
      };
    }

    if(new Date(date) > new Date()){
      return {
        ok: false,
        message: "Insert a valid date",
        culprit: dateInput.current,
      };
    }

    return { ok: true };
  }

  function clearFields(){
    nameInput.current.value = ""
    amountInput.current.value = ""
    descriptionInput.current.value = ""
    dateInput.current.value = today
    setErrorMessage("")
  }

  return (
    <div className="backdrop">
      <div className="register-expense-container">
        <div className="register-expense-header">
          <h1>Register New Expense</h1>
          <button onClick={() => {onClose(true)}}>
            <img src={Close} />
          </button>
        </div>
        <div className="register-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            ref={nameInput}
            placeholder="What is the expense?"
          />
        </div>
        <div className="register-input">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            name="amount"
            ref={amountInput}
            placeholder="0.00"
          />
        </div>
        <div className="register-input">
          <label htmlFor="category">Category</label>
          <CategorySelect
            options={selectOptions}
            name="category"
            ref={categoryInput}
          />
        </div>
        <div className="register-input">
          <label htmlFor="description">Description (optional)</label>
          <input
            type="text"
            name="description"
            ref={descriptionInput}
            placeholder="What was this expense for?"
          />
        </div>
        <div className="register-input">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" defaultValue={today} ref={dateInput} />
        </div>

        <p style={{ color: "red" }}>{errorMessage}</p>

        <button
          onClick={() => {
            const result = validateFields();
            if (result.ok) {
              btnOnClick(name, category, description, amount, date);
              clearFields()
              onCloseToast();
              return;
            } else if (result.culprit != categoryInput.current) {
              result.culprit.classList.add("shake");
              setTimeout(() => {
                result.culprit.classList.remove("shake");
              }, 500);

              setErrorMessage(result.message);
            }
          }}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default RegisterExpenseCard;
