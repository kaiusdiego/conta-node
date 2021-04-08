import { ConnectionOptions } from "typeorm";
import Conta from "../entities/conta";

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.CONTAS_DB_HOST || "localhost",
  port: Number(process.env.CONTAS_DB_PORT) || 5432,
  username: process.env.CONTAS_DB_USER || "postgres",
  password: process.env.CONTAS_DB_PASS || "admin",
  database: process.env.CONTAS_DB_NAME || "postgres",
  entities: [ Conta ],
  synchronize: true,
};

export default dbConfig;
