import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// BalanceUpdate.tsx
import { useState } from 'react';
import axios from 'axios';
const BalanceUpdate = ({ userId, onBalanceUpdated }) => {
    const [newBalance, setNewBalance] = useState("");
    const handleInputChange = (e) => {
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
            .put(`http://localhost:8080/user/${userId}/balance`, balanceValue, // Send the balance as a JSON object
        {
            headers: {
                'Content-Type': 'application/json', // Ensure the correct content type
            },
        })
            .then((response) => {
            // Pass the updated balance to parent
            onBalanceUpdated(response.data.balance);
            setNewBalance(""); // Clear input field
        })
            .catch((error) => {
            console.error("Error updating balance:", error);
        });
    };
    return (_jsxs("div", { children: [_jsx("input", { type: "number", value: newBalance, onChange: handleInputChange, placeholder: "Update Balance" }), _jsx("button", { onClick: handleUpdateBalance, children: "Update Balance" })] }));
};
export default BalanceUpdate;
