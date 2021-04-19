import request from "supertest";
import app from "./../../app";
import { createConnection } from "typeorm"
import dbConfig from './../../database/index'

describe('Contas - API', () => {

    
  it('deve criar conta e retornar objeto conta', async () => {
    createConnection(dbConfig)
      .then( async(_connection) => {
        const response = await request(app)
        .post("/contas")
        expect(response.body).toHaveProperty('idConta')
      })
      .catch((err) => {
        console.log("Não foi possível conectar ao banco:", err)
      });
  })


  it('deve retornar o saldo de uma conta utilizando o idConta', async () => {
    createConnection(dbConfig)
      .then( async(_connection) => {
        const response = await request(app)
        .get("/contas/1/saldo")
        expect(response.body).toHaveProperty('saldo')
      })
      .catch((err) => {
        console.log("Não foi possível conectar ao banco:", err)
      });
  })

  it('deve realizar depósito através do idConta e valor', async () => {
    createConnection(dbConfig)
      .then( async(_connection) => {
        const response = await request(app)
        .put("/contas/1/deposito")
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