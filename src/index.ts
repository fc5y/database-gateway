import Express from "express";
import Knex from "knex";

import * as utils from "./utils";
import dotenv from "dotenv";

dotenv.config();

const app = Express();
const port = 3000;

const knex = Knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/db/v2/timestamp", (req: Express.Request, res: Express.Response) => {
  res.json({ timestamp: utils.getCurrentTimestamp() });
});

app.get("/db/v2/contests", (req: Express.Request, res: Express.Response) => {
  knex
    .select("*")
    .from("Contests")
    .then((rows) => {
      res.json(rows);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
