// BalanceUpdate.tsx
import React, { useState } from 'react';
import axios from 'axios';



interface BalanceUpdateProps {
    userId: string;
    onBalanceUpdated: (newBalance: number) => void;
}

const BalanceUpdate: React.FC<BalanceUpdateProps> = ({ userId, onBalanceUpdated }) => {
    const [newBalance, setNewBalance] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewBalance(e.target.value);
    };

    const handleUpdateBalance = () => {
        if (newBalance === "") {
            alert("Please enter a balance.");
            return;
        }

        const balanceValue = parseFloat(newBalance);

        // Update the balance
        axios
            .put(
                `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/${userId}/balance`,
                balanceValue , // Send the balance as a JSON object
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure the correct content type
                    },
                }
            )
            .then((response) => {
                // Pass the updated balance to parent
                onBalanceUpdated(response.data.balance);
                setNewBalance(""); // Clear input field
            })
            .catch((error) => {
                console.error("Error updating balance:", error);
            });
    };

    return (
        <div>
            <input
                type="number"
                value={newBalance}
                onChange={handleInputChange}
                placeholder="Update Balance"
            />
            <button onClick={handleUpdateBalance}>Update Balance</button>
        </div>
    );
};

export default BalanceUpdate;
