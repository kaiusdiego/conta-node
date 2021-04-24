import { Request, Response } from 'express'
import request from "supertest";
import  IConta  from "../models/IConta"
import { config } from "dotenv"; 
import { criarConta, obterSaldo, bloquearConta, obterTodas, depositarValor, sacarValor } from "../database/repositories/contaRepository";
import RabbitmqServer from 'src/RabbitmqServer';

class ContasController  {

  
  /**
   *  index 
   * return lista de todas as contas
   */
  public async index( req: Request, res: Response) {
    try {
      const all = await obterTodas()
      return res.json(all)
    } catch (error) {
      let result = {
        message: error.toString(),
        code: 404,
        error: "Não encontrada"
      }
      return res.status(404).json(result)
    }
  }

  /**
   *  saldo 
   * return saldo de uma conta
   */
  public async obterSaldo( req: Request, res: Response) {
    try {
      const saldo = await obterSaldo(Number.parseInt(req.params.id))
      return res.json({saldo})
    } catch (error) {
      let result = {
        message: error.toString(),
        code: 404,
        error: "Não encontrada"
      }
      return res.status(404).json(result)
    }
  }

  /**
   * post
   */
  public async criar(req: Request, res: Response ) {
    try {
      const conta =  await criarConta(<IConta>req.body)
      return res.status(201).json(conta)
    } catch (error) {
      let result = {
        message: error.toString(),
        code: 400,
        error: "Não foi possível criar a conta."
      }
      return res.status(400).json(result)
    }
  }

  /**
   * put
   */
   public async depositar(req: Request, res: Response ) {
     try {
      const server = new RabbitmqServer()
      await server.init()
      await server.declareExchange('contas')
      await server.declareQueue('deposito')
      await server.bindQueueExchange('deposito','contas','deposito.transacao')

      const valor = <number>req.body?.valor
      const idConta = Number.parseInt(req.params?.id)
      const conta =  await depositarValor(idConta,valor)
      await server.rKeyPublish('contas','deposito.transacao',
      JSON.stringify({idConta,valor, dataTransacao: new Date()}))
      return res.json(conta)
    } catch (error) {
      let result = {
        message: error.toString(),
        code: 400,
        error: "Não foi possível depositar valor."
      }
      return res.status(400).json(result)
    }
  }

  /**
   * put
   */
   public async sacar(req: Request, res: Response ) {
     try {
      const server = new RabbitmqServer()
      await server.init()
      await server.declareExchange('contas')
      await server.declareQueue('saque')
      await server.bindQueueExchange('saque','contas','saque.transacao')

      const valor = <number>req.body?.valor
      const idConta = Number.parseInt(req.params?.id)
      const saldo = await obterSaldo(idConta)
      if (valor > saldo) {
        throw new Error('Saldo insuficiente.');
      }
      const conta =  await sacarValor(idConta,valor)
      await server.rKeyPublish('contas','saque.transacao',
      JSON.stringify({idConta,valor, dataTransacao: new Date()}))
      return res.json(conta)
    } catch (error) {
      let result = {
        message: error.toString(),
        code: 400,
        error: "Não foi possível sacar valor."
      }
      return res.status(400).json(result)
    }
  }

  /**
   * put
   */
  public async bloquear(req: Request, res: Response) {
    try {
      const conta =  await bloquearConta(Number.parseInt(req.params?.id))
      if( conta === null)
        throw new Error();
      return res.send(conta)
    } catch (error) {
      let result = {
        message: error.toString(),
        code: 400,
        error: `Não foi possível bloquear a conta. Verifique
        se ela já não está bloqueada.`
      }
      return res.status(400).json(result)
    }
  }


}

export default new ContasController()
