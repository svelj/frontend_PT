import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Dashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import BalanceDisplay from './BalanceDisplay';
import BalanceUpdate from './BalanceUpdate';
const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0.0);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    useEffect(() => {
        if (!userId) {
            navigate('/login'); // Redirect to login if not authenticated
        }
        else {
            fetchTransactions();
            fetchBalance();
        }
    }, [navigate, userId]);
    const fetchTransactions = () => {
        axios
            .get(`http://localhost:8080/transaction/user/${userId}`)
            .then((response) => {
            setTransactions(response.data);
        })
            .catch((error) => {
            console.error('Error fetching transactions:', error);
        });
    };
    const fetchBalance = () => {
        axios
            .get(`http://localhost:8080/user/${userId}/balance`)
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
    const handleBalanceUpdated = (newBalance) => {
        setBalance(newBalance); // Update balance in the state
    };
    const handleLogout = () => {
        // Clear localStorage and redirect to login page
        localStorage.removeItem('userId');
        navigate('/login');
    };
    return (_jsxs("div", { children: [_jsx("h1", { children: "My Dashboard" }), _jsx("button", { onClick: handleLogout, children: "Logout" }), _jsx(BalanceDisplay, { balance: balance }), _jsx(BalanceUpdate, { userId: userId, onBalanceUpdated: handleBalanceUpdated }), _jsx(AddTransaction, { onTransactionAdded: handleAddTransaction }), _jsx(TransactionList, { transactions: transactions })] }));
};
export default Dashboard;
