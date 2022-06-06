import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

var jsonParser = bodyParser.json();

const app: express.Application = express();
app.use(cors());
app.use(jsonParser);
const port: number = 4000;
const mysql = require("mysql2");
const env: any = process.env;

// create the connection to database
const connection = mysql.createConnection({
  host: env.host,
  user: env.username,
  password: env.password,
  database: env.database,
});

connection.query(
  "CREATE TABLE IF NOT EXISTS history (id integer primary key auto_increment, num1 integer, num2 integer, sum integer)",
  function (err: any, results: any, fields: any) {
    // results contains rows returned by server
  }
);

app.post("/api/calculate", (_req, _res) => {
  const number1: Number = _req.body.number1;
  const number2: Number = _req.body.number2;
  const sum: number = Number(number1) + Number(number2);
  connection.query(
    `insert into history values(null,${number1},${number2},${sum})`,
    function (err: any, results: any, fields: any) {
      _res.json(sum);
    }
  );
});

app.get("/api/history", (_req, _res) => {
  connection.query(
    `select * from history;`,
    function (err: any, results: any, fields: any) {
      console.log(results); // results contains rows returned by server
      _res.json(results);
    }
  );
});

app.get("/test", (_req, _res) => {
  _res.send("Server is running!");
});

app.get("/*", express.static("build"));

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
