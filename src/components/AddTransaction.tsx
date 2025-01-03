import React, { useState } from 'react';
import axios from 'axios';
import { Transaction } from '../types/Transaction';
import balanceUpdate from "./BalanceUpdate.tsx";

interface AddTransactionProps {
    onTransactionAdded: () => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onTransactionAdded }) => {
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<'INCOME' | 'EXPENSE'>('INCOME');
    const [error, setError] = useState<string>('');

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Get the logged-in user's ID from localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User not logged in');
            return;
        }

        // Creating the transaction object
        const newTransaction: Transaction = {
            amount,
            category,
            type,
            user: { id: parseInt(userId) }, // Use userId here (ensure it is in number format)
            description,
            date: new Date().toISOString(),  // Ensure it's a valid ISO date string
        };

        // Send the request to the backend
        axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/transaction/add`, newTransaction, {
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

    return (
        <div>
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as 'INCOME' | 'EXPENSE')}
                    >
                        <option value="INCOME">Income</option>
                        <option value="EXPENSE">Expense</option>
                    </select>
                </div>
                <button type="submit">Add Transaction</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default AddTransaction;
