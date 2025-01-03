import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TransactionList = ({ transactions }) => {
    return (_jsxs("div", { children: [_jsx("h2", { children: "Transaction History" }), _jsx("ul", { children: transactions.map((transaction) => (_jsxs("li", { children: [_jsx("p", { children: transaction.category }), _jsx("p", { children: transaction.description }), _jsx("p", { children: transaction.amount }), _jsx("p", { children: transaction.date }), _jsx("p", { children: transaction.type })] }, transaction.id))) })] }));
};
export default TransactionList;
