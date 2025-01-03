import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const BalanceDisplay = ({ balance }) => {
    return (_jsx("div", { children: _jsxs("h3", { children: ["Current Balance: $", balance.toFixed(2)] }) }));
};
export default BalanceDisplay;
