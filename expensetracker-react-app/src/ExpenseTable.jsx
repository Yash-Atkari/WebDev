import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import { useEffect } from "react";

export default function ExpenseTable() {
    /* Load saved expenses from localStorage if they exist
    even after the page refreshing the expenses is initializes with savedExpenses if they exist otherwise empty, and shows in table that's why data is not vanish */
    const [expenses, setExpenses] = useState(() => {
        const savedExpenses = localStorage.getItem("expenses");
        return savedExpenses ? JSON.parse(savedExpenses) : [{
            expense: "",
            description: "",
            amount: "",
            category: "",
            action: true,
        },];
    });

    let [total, setTotal] = useState(() => {
        const savedTotal = localStorage.getItem("total");
        return savedTotal ? JSON.parse(savedTotal) : 0;
    });

    let [currExpense, setCurrExpense] = useState(null);

    // re-render occurs from here except initialization

    // Update expenses in localStorage under the key expenses whenever expenses change 
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    // update the total in localStorage
    useEffect(() => {
        localStorage.setItem("total", JSON.stringify(total));
    }, [total]);

    let addNewExpense = (expenseInfo) => {
        setExpenses((currData) => {
            return [...currData, expenseInfo];
        });
        setTotal((currData) => {
            return currData + Number(expenseInfo.amount);
        });
    };

    let deleteExpense = (index) => {
        let ExpenseToDelete = expenses[index];
        // update total
        setTotal((currData) => {
            return currData - Number(ExpenseToDelete.amount);
        });
        // filter currData
        setExpenses((currData) => currData.filter((expenseInfo, idx) => idx != index));
    };

    let editExpense = (index) => {
        // delete expense from the table
        deleteExpense(index);

        // Show in the form
        let expenseToEdit = expenses[index];
        setCurrExpense({
            expense: expenseToEdit.expense,
            description: expenseToEdit.description,
            amount: expenseToEdit.amount,
            category: expenseToEdit.category,
            action: true,
        });
    };

    return (
        <>
        <ExpenseForm addNewExpense={addNewExpense} currExpense={currExpense}/>
        <table border="1">
            <thead>
                <tr>
                    <th>Expense</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {expenses.map((expenseInfo, idx) => (
                    <tr key={idx}>
                        <td>{expenseInfo.expense}</td>
                        <td>{expenseInfo.description}</td>
                        <td>{expenseInfo.amount}</td>
                        <td>{expenseInfo.category}</td>
                        <td>{
                            expenseInfo.action && 
                                <>
                                <button style={{fontSize: "0.7rem"}} onClick={() => editExpense(idx)}>Edit</button>
                                <button style={{fontSize: "0.7rem"}} onClick={() => deleteExpense(idx)}>Delete</button>
                                </>
                        }</td>
                    </tr>
                ))}
            </tbody>

            <tfoot>
                <tr>
                    <th colSpan="5">Total: ${total}.00</th>
                </tr>
            </tfoot>
        </table>
        </>
    );
}
