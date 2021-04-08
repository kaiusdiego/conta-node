import { ConnectionOptions } from "typeorm";
import Transacao from "../entities/transacao";

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.TRANSACOES_DB_HOST || "localhost",
  port: Number(process.env.TRANSACOES_DB_PORT) || 5432,
  username: process.env.TRANSACOES_DB_USER || "postgres",
  password: process.env.TRANSACOES_DB_PASS || "admin",
  database: process.env.TRANSACOES_DB_NAME || "postgres",
  entities: [ Transacao ],
  synchronize: true,
};

export default dbConfig;
