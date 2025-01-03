// src/components/TransactionList.tsx
import React from 'react';
import { Transaction } from '../types/Transaction';

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        <p>{transaction.category}</p>
                        <p>{transaction.description}</p>
                        <p>{transaction.amount}</p>
                        <p>{transaction.date}</p>
                        <p>{transaction.type}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
