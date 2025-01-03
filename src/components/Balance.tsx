import React, { useState, useEffect } from "react";
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

    return (
        <div>
            <h3>Balance: ${balance.toFixed(2)}</h3>
            <input
                type="number"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                placeholder="Update Balance"
            />
            <button onClick={updateBalance}>Update</button>
        </div>
    );
};

export default Balance;
