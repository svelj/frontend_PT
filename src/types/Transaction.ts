export interface User {
    id: number;
    username: string;
    balance: number;
}

export interface Transaction {
    id: number;
    amount: number;
    category: string;
    type: 'INCOME' | 'EXPENSE';
    user: User;  // The user field expects a full User object
    description: string;
    date: string; // Ensure that this is a string in ISO 8601 format (which is what you send)
}
