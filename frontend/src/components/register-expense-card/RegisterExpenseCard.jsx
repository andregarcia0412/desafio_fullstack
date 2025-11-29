import "./style.register-expense-card.css";
import React from "react";
import CategorySelect from "../../components/select/Select.jsx";
import Close from "../../assets/close.png";

const RegisterExpenseCard = ({
  btnOnClick,
  onClose,
  onCloseToast,
  isEditCard = false,
  h1Text = "Register New Expense",
  btnText = "Add Expense",
  placeholders = [
    "What is the expense?",
    "0.00",
    "Select a category",
    "What was this expense for?",
  ],
  values = ["", "", "", "", new Date().toISOString().split("T")[0]],
}) => {
  const nameInput = React.useRef();
  const descriptionInput = React.useRef();
  const categoryInput = React.useRef();
  const amountInput = React.useRef();
  const dateInput = React.useRef();

  const [errorMessage, setErrorMessage] = React.useState("");

  const today = new Date().toISOString().split("T")[0];

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

    if (Number(amount) < 0) {
      return {
        ok: false,
        message: "Insert a positive number",
        culprit: amountInput.current,
      };
    }

    if (amount[amount.length - 1] === ".") {
      return {
        ok: false,
        message: "Insert a valid number",
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

    if (new Date(date) > new Date() || new Date(date) < new Date().setFullYear(2000)) {
      return {
        ok: false,
        message: "Insert a valid date",
        culprit: dateInput.current,
      };
    }

    return { ok: true };
  }

  function clearFields() {
    nameInput.current.value = "";
    amountInput.current.value = "";
    descriptionInput.current.value = "";
    dateInput.current.value = today;
    setErrorMessage("");
  }

  return (
    <div className="backdrop">
      <div className="register-expense-container">
        <div className="register-expense-header">
          <h1>{h1Text}</h1>
          <button
            onClick={() => {
              onClose(true);
            }}
          >
            <img src={Close} />
          </button>
        </div>
        <div className="register-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            ref={nameInput}
            placeholder={placeholders[0]}
            defaultValue={values[0]}
          />
        </div>
        <div className="register-input">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            name="amount"
            ref={amountInput}
            placeholder={placeholders[1]}
            defaultValue={values[1]}
            maxLength={13}
          />
        </div>
        <div className="register-input">
          <label htmlFor="category">Category</label>
          <CategorySelect
            options={selectOptions}
            name="category"
            ref={categoryInput}
            placeholder={placeholders[2]}
            initialValue={values[2]}
          />
        </div>
        <div className="register-input">
          <label htmlFor="description">Description (optional)</label>
          <input
            type="text"
            name="description"
            ref={descriptionInput}
            placeholder={placeholders[3]}
            defaultValue={values[3]}
          />
        </div>
        <div className="register-input">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            defaultValue={values[4]}
            ref={dateInput}
          />
        </div>

        <p style={{ color: "red" }}>{errorMessage}</p>

        <button
          onClick={async () => {
            const result = validateFields();
            if (result.ok) {
              if (isEditCard) {
                btnOnClick({
                  name,
                  category,
                  description,
                  amount: Number(amount),
                  date,
                });
                onClose(true);
              } else {
                btnOnClick(name, category, description, amount, date);
                onCloseToast();
              }
              clearFields();
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
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default RegisterExpenseCard;
