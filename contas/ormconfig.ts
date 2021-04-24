import { ConnectionOptions } from 'typeorm';
 
const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'db',
  port: Number(process.env.CONTAS_DB_PORT),
  username: process.env.CONTAS_DB_USER,
  password: process.env.CONTAS_DB_PASS,
  database: process.env.CONTAS_DB_NAME,
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
  ],
  synchronize: true,
};
 
export default dbConfig;