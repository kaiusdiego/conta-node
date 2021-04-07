import { ConnectionOptions } from "typeorm";
import Transacao from "../entities/transacao";

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "admin",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [ Transacao ],
  synchronize: true,
};

export default dbConfig;
