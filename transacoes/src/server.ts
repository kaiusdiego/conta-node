import { config } from "dotenv"; 
import app from './app'
import "reflect-metadata";
import { createConnection } from "typeorm"
import dbConfig from './database/index'

config({path:__dirname+'/./../../.env'});

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(process.env.APPTRANSACAO_PORT, () => {
      console.log("API Transações rodando na porta:", process.env.APPTRANSACAO_PORT);
    });
  })
  .catch((err) => {
    console.log("Não foi possível conectar ao banco:", err);
    process.exit(1);
  });
