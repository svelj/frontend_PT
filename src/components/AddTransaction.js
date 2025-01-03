import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import balanceUpdate from "./BalanceUpdate.tsx";
const AddTransaction = ({ onTransactionAdded }) => {
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('INCOME');
    const [error, setError] = useState('');
    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // Get the logged-in user's ID from localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User not logged in');
            return;
        }
        // Creating the transaction object
        const newTransaction = {
            amount,
            category,
            type,
            user: { id: parseInt(userId) }, // Use userId here (ensure it is in number format)
            description,
            date: new Date().toISOString(), // Ensure it's a valid ISO date string
        };
        // Send the request to the backend
        axios.post('http://localhost:8080/transaction/add', newTransaction, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
            console.log('Transaction added:', response.data);
            onTransactionAdded();
            balanceUpdate();
        })
            .catch(error => {
            console.error('Error adding transaction:', error.response || error);
        });
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Add Transaction" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { children: "Amount:" }), _jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(Number(e.target.value)), required: true })] }), _jsxs("div", { children: [_jsx("label", { children: "Category:" }), _jsx("input", { type: "text", value: category, onChange: (e) => setCategory(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { children: "Description:" }), _jsx("input", { type: "text", value: description, onChange: (e) => setDescription(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { children: "Type:" }), _jsxs("select", { value: type, onChange: (e) => setType(e.target.value), children: [_jsx("option", { value: "INCOME", children: "Income" }), _jsx("option", { value: "EXPENSE", children: "Expense" })] })] }), _jsx("button", { type: "submit", children: "Add Transaction" }), error && _jsx("p", { style: { color: 'red' }, children: error })] })] }));
};
export default AddTransaction;
