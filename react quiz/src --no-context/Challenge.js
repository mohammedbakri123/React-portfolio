import { useReducer } from "react";
const InitialState = {
  balance: 0,
  loan: 0,
  isAccountOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_ACCOUNT":
      return { ...state, isAccountOpen: true, balance: 500 };
    case "DEPOSITE":
      return { ...state, balance: state.balance + action.payload };
    case "WITHDRAW":
      return { ...state, balance: state.balance - action.payload };
    case "REQUEST_LOAN":
      if (state.loan > 0) {
        return state;
      }
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "PAY_LOAN":
      return { ...state, balance: state.balance - state.loan, loan: 0 };
    case "CLOSE_ACCOUNT":
      if (state.balance > 0 || state.loan > 0) {
        return state;
      }
      return { ...InitialState };
    default:
      return state;
  }
};

export default function Challenge() {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const { balance, loan, isAccountOpen } = state;
  return (
    <div className="bank">
      <h1>Bank Account</h1>
      <h3>Balance : {balance}</h3>
      <h3>loan : {loan}</h3>
      <button
        className="btn btn-ui"
        disabled={isAccountOpen}
        onClick={() => {
          dispatch({ type: "OPEN_ACCOUNT" });
        }}
      >
        open Account
      </button>
      <button
        className="btn btn-ui"
        disabled={!isAccountOpen}
        onClick={() => {
          dispatch({ type: "DEPOSITE", payload: 1000 });
        }}
      >
        Deposite{" "}
      </button>
      <button
        className="btn btn-ui"
        disabled={!isAccountOpen}
        onClick={() => {
          dispatch({ type: "WITHDRAW", payload: 500 });
        }}
      >
        Withdraw
      </button>
      <button
        className="btn btn-ui"
        disabled={!isAccountOpen}
        onClick={() => dispatch({ type: "REQUEST_LOAN", payload: 5000 })}
      >
        Requst loan of 5000
      </button>
      <button
        className="btn btn-ui"
        disabled={!isAccountOpen && loan === 0}
        onClick={() => dispatch({ type: "PAY_LOAN" })}
      >
        Pay loan
      </button>
      <button
        className="btn btn-ui"
        disabled={!isAccountOpen || balance > 0 || loan > 0}
        onClick={() => dispatch({ type: "CLOSE_ACCOUNT" })}
      >
        close Account
      </button>
    </div>
  );
}
