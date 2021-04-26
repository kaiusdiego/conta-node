import Pessoa from "src/entities/pessoa";
import { ConnectionOptions } from "typeorm";
import Conta from "../entities/conta";

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: 'contasdb',
  port: Number(process.env.CONTAS_DB_PORT),
  username: process.env.CONTAS_DB_USER,
  password: process.env.CONTAS_DB_PASS,
  database: process.env.CONTAS_DB_NAME,
  entities: [ Conta, Pessoa ],
  synchronize: true,
};

export default dbConfig;
