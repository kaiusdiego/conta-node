import { ConnectionOptions } from "typeorm";
import Transacao from "../entities/transacao";

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: "transacoesdb",
  port: Number(process.env.TRANSACOES_DB_PORT),
  username: process.env.TRANSACOES_DB_USER,
  password: process.env.TRANSACOES_DB_PASS,
  database: process.env.TRANSACOES_DB_NAME,
  entities: [ Transacao ],
  synchronize: true,
};

export default dbConfig;
