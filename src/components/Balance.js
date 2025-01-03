import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
const Balance = ({ userId }) => {
    const [balance, setBalance] = useState(0.0);
    const [newBalance, setNewBalance] = useState("");
    useEffect(() => {
        // Fetch the user's balance on component mount
        axios.get(`http://localhost:8080/user/${userId}/balance`)
            .then((response) => setBalance(response.data))
            .catch((error) => console.error("Error fetching balance:", error));
    }, [userId]);
    const updateBalance = () => {
        axios.put(`http://localhost:8080/user/${userId}/balance`, parseFloat(newBalance))
            .then((response) => {
            setBalance(response.data);
            setNewBalance("");
        })
            .catch((error) => console.error("Error updating balance:", error));
    };
    return (_jsxs("div", { children: [_jsxs("h3", { children: ["Balance: $", balance.toFixed(2)] }), _jsx("input", { type: "number", value: newBalance, onChange: (e) => setNewBalance(e.target.value), placeholder: "Update Balance" }), _jsx("button", { onClick: updateBalance, children: "Update" })] }));
};
export default Balance;
