import { useState } from "react";
import { useEffect } from "react";

export default function ExpenseForm({ addNewExpense, currExpense }) {
    let [expenseInfo, setFormData] = useState({
        expense: "",
        description: "",
        amount: "",
        category: "",
        action: true,
    });

    // re-render occurs from here except initialization

    useEffect(() => {
        if (currExpense) {
            setFormData(currExpense);
        }
    }, [currExpense]);

    let handleInput = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;

        setFormData((currData) => {
            return {...currData, [fieldName]: fieldValue}
        });
    };

    let handleSubmit = (event) => {
        addNewExpense(expenseInfo);
        event.preventDefault();
        setFormData({
            expense: "",
            description: "",
            amount: "",
            category: "",
            action: true,
        });
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h3>Expense Tracker</h3>

            <label htmlFor="expense">Expense: </label>
            <input 
            type="text"
            placeholder="Enter Expense"
            id="expense"
            name="expense"
            value={expenseInfo.expense}
            onChange={handleInput}
            required
            />
            <br /><br />

            <label htmlFor="description">Description: </label>
            <textarea 
            name="description"
            id="description"
            placeholder="Enter Description"
            value={expenseInfo.description}
            onChange={handleInput}>
            </textarea>
            <br /><br />

            <label htmlFor="amount">Amount: </label>
            <input
            type="number"
            placeholder="Enter amount"
            id="amount"
            name="amount"
            value={expenseInfo.amount}
            onChange={handleInput}
            required
            />
            <br /><br />

            <label htmlFor="category">Category: </label>
            <select name="category" value={expenseInfo.category} id="category" onChange={handleInput}>
                <option value="" disabled>Select Category</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
            </select>
            <br /><br />

            <button type="submit">Add Expenses</button>
            <br /><br />
        </form>
        </>
    );
}
