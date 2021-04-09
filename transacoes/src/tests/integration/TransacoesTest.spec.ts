import request from "supertest";
import app from "./../../app";
import { createConnection } from "typeorm"
import dbConfig from './../../database/index'



describe('Transacoes', () => {

  it('deve retornar transações utilizando idConta', async () => {
    createConnection(dbConfig)
      .then( async(_connection) => {
        const response = await request(app)
        .get("/transacoes/?idConta=1")
        expect(response.body[0]).toHaveProperty('idTransacao')
        
      })
      .catch((err) => {
        console.log("Não foi possível conectar ao banco:", err)
      });
  })

  it('deve retornar transações utilizando idConta e período', async () => {
    createConnection(dbConfig)
      .then( async(_connection) => {
        const response = await request(app)
        .get("/transacoes/?idConta=1&dtInicio='2021-04-05'&dtInicioFim='2021-04-10'")
        expect(response.body[0]).toHaveProperty('idTransacao')
        
      })
      .catch((err) => {
        console.log("Não foi possível conectar ao banco:", err)
      });
  })

  it('Não deve retornar transações caso o id não seja numérico', async () => {
    createConnection(dbConfig)
      .then( async(_connection) => {
        const response = await request(app)
        .get("/transacoes/?idConta=teste&dtInicio='2021-04-05'&dtInicioFim='2021-04-10'")
        expect(response.status).toBe(404)
        
      })
      .catch((err) => {
        console.log("Não foi possível conectar ao banco:", err)
      });

  })


})