// BalanceDisplay.tsx
import React from 'react';

interface BalanceDisplayProps {
    balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
    return (
        <div>
            <h3>Current Balance: ${balance.toFixed(2)}</h3>
        </div>
    );
};

export default BalanceDisplay;
