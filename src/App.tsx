import React, { useState } from "react";
import "./App.css";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(0);

  const calculate = () => {
    fetch("http://localhost:4000/api/calculate", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        number1: num1,
        number2: num2,
      }),
    })
      .then((res: any) => {
        console.log(res.body);
        setResult(Number(res.body.sum));
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        </div>
      </div>
    </div>
  );
}

export default App;
