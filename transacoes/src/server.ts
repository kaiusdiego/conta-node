import { config } from "dotenv" 
import app from './app'
import "reflect-metadata"
import { createConnection } from "typeorm"
import dbConfig from './database/index'
import Consumer from "./Consumer"

config({path:__dirname+'/./../../.env'})

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(process.env.APPTRANSACAO_PORT, () => {
      console.log("API Transações rodando na porta:", process.env.APPTRANSACAO_PORT)
      const rabbit = new Consumer()
      rabbit.consume(process.env.RABBITMQ_URI)
    });
  })
  .catch((err) => {
    console.log("Não foi possível conectar ao banco:", err)
    process.exit(1)
  });
