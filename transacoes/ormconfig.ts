import { ConnectionOptions } from 'typeorm';
 
const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'transacoesdb',
  // port: Number(process.env.TRANSACOES_DB_PORT),
  port: 5432,
  username: process.env.TRANSACOES_DB_USER,
  password: process.env.TRANSACOES_DB_PASS,
  database: process.env.TRANSACOES_DB_NAME,
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
  ],
  synchronize: true,
};
 
export default dbConfig;