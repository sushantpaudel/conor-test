import express from "express";
import History from "./models/history.model";
require("./config/db");

const app: express.Application = express();

const port: number = 4000;

app.post("/api/calculate", (_req, _res) => {
  const number1: number = _req.body.number1;
  const number2: number = _req.body.number2;
  const sum: number = number1 + number2;
  History.create({
    number1,
    number2,
    sum,
  });
  _res.json({ sum });
});

app.get("/test", (_req, _res) => {
  _res.send("Server is running!");
});

app.get("/", express.static("build"));

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
