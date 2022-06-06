"use strict";

import { Sequelize } from "sequelize-typescript";

const env: any = process.env;

const sequelize = new Sequelize({
  database: env.database || "conor_test",
  username: env.username || "root",
  password: env.password || "root",
  dialect: env.dialect || "mysql",
  host: env.host || "localhost",
  models: [__dirname + "/**/*.model.ts"],
});



sequelize.sync().then(() => console.log("Database connected!"));
