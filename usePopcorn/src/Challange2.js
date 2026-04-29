
// https://api.frankfurter.app/latest?amount=10&from=USD&to=EUR

import { useEffect, useState } from "react";
const currancies = ["USD", "EUR", "CAD", "INR"];

export default function App() {
  const [input, setInput] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [output, setOutput] = useState("");

  useEffect(() => {
    fetch(
      `https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`
    )
      .then((res) => res.json())
      .then((date) => setOutput(date.rates[to]));
  }, [from, to, input]);
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        {Array.from(currancies).map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        {Array.from(currancies).map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
      <p>{`${output} ${to}`}</p>
    </div>
  );
}
