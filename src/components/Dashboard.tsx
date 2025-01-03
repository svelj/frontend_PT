// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Transaction } from '../types/Transaction';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import BalanceDisplay from './BalanceDisplay';
import BalanceUpdate from './BalanceUpdate';

const Dashboard: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<number>(0.0);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    useEffect(() => {
        if (!userId) {
            navigate('/login'); // Redirect to login if not authenticated
        } else {
            fetchTransactions();
            fetchBalance();
        }
    }, [navigate, userId]);

    const fetchTransactions = () => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/transaction/user/${userId}`)
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching transactions:', error);
            });
    };

    const fetchBalance = () => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/${userId}/balance`)
            .then((response) => {
                setBalance(response.data);
            })
            .catch((error) => {
                console.error('Error fetching balance:', error);
            });
    };

    const handleAddTransaction = () => {
        fetchTransactions();
        fetchBalance();
    };

    const handleBalanceUpdated = (newBalance: number) => {
        setBalance(newBalance); // Update balance in the state
    };

    const handleLogout = () => {
        // Clear localStorage and redirect to login page
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <div>
            <h1>My Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>

            {/* Balance Section */}
            <BalanceDisplay balance={balance} />
            <BalanceUpdate userId={userId!} onBalanceUpdated={handleBalanceUpdated} />

            {/* Transactions Section */}
            <AddTransaction onTransactionAdded={handleAddTransaction} />
            <TransactionList transactions={transactions} />
        </div>
    );
};

export default Dashboard;
