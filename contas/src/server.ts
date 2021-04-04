import { config } from "dotenv"; 
import app from './app'
import "reflect-metadata";
import { createConnection } from "typeorm";
import dbConfig from './database/index'


config();

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });