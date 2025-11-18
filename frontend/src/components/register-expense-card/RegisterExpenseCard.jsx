import "./style.register-expense-card.css"
import React from "react"

const RegisterExpenseCard = () => {

    return(
        <div className="register-expense-container">
            <h1>Register New Expense</h1>

            <div className="register-input">
                <label for="amount">Amount</label>
                <input type="text" name="amount"/>
            </div>
            <div className="register-input">
                <label for="category">Category</label>
                <select type="text" name="category"/>
            </div>
            <div className="register-input">
                <label for="description">Description</label>
                <input type="text" name="description"/>
            </div>
            <div className="register-input">
                <label for="date">Date</label>
                <input type="date" name="date"/>
            </div>

            <button>
                Add Expense
            </button>
        </div>
    )
}

export default RegisterExpenseCard