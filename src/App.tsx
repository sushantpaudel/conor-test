import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);

  const getResults = () => {
    fetch("http://localhost:4000/api/history", {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((history: any) => {
        setHistory(history);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculate = () => {
    fetch("http://localhost:4000/api/calculate", {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify({
        number1: num1,
        number2: num2,
      }),
    })
      .then((response) => response.json())
      .then((sum: number) => {
        setResult(sum);
        return getResults();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => getResults(), []);

  return (
    <div className="main">
      <div className="navbar">CALCULATOR</div>
      <div className="content">
        <div className="inside-content">
          <div>Enter the numbers</div>
          <input
            className="num-input width-content"
            placeholder="number 1"
            type="number"
            value={num1}
            onChange={({ target: { value } }) => setNum1(value)}
          />
          <input
            className="num-input width-content"
            placeholder="number 2"
            type="number"
            value={num2}
            onChange={({ target: { value } }) => setNum2(value)}
          />
          <button className="sum-button width-content" onClick={calculate}>
            Sum
          </button>
          <div className="hr" />
          <div>Results</div>
          <div className="num-output width-content">{result}</div>
          <div className="output-list width-content">
            <table>
              <thead>
                <th>Number 1</th>
                <th>Number 2</th>
                <th>Sum</th>
              </thead>
              <tbody>
                {history.map((h: any, i) => (
                  <tr key={i}>
                    <td>{h.num1}</td>
                    <td>{h.num2}</td>
                    <td>{h.sum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
