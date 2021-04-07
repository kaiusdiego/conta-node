import { Request, Response } from 'express'
import  IConta  from "../models/IConta"
import { config } from "dotenv"; 
import { criarConta, obterSaldo, bloquearConta, obterTodas, depositarValor, sacarValor } from "../database/repositories/contaRepository";
import RabbitmqServer from 'src/RabbitmqServer';
config({path:__dirname+'/./../../../.env'});

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
      return res.json(`Não foi possível listar contas. ${error}`)
    }
    

  }

  /**
   *  saldo 
   * return saldo de uma conta
   */
  public async obterSaldo( req: Request, res: Response) {
    try {
      const saldo = await obterSaldo(Number.parseInt(req.params.id))
      return res.json(saldo)
    } catch (error) {
      return res.json(`Não foi possível obter saldo da conta. ${error}`)
    }
  }

  /**
   * get
   */
  public async get() {
    
  }

  /**
   * post
   */
  public async criar(req: Request, res: Response ) {
    try {
      const conta =  await criarConta(<IConta>req.body)
      return res.json(conta)
    } catch (error) {
      return res.json(`Não foi possível criar a conta. ${error}`)
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
      const msgSent = await server.rKeyPublish('contas','deposito.transacao',
      JSON.stringify({idConta,valor, dataTransacao: ''}))
      return res.json({data:conta, msgSent})
    } catch (error) {
      return res.json(`Não foi possível depositar valor. ${error}`)
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
      const conta =  await sacarValor(idConta,valor)
      const msgSent = await server.rKeyPublish('contas','saque.transacao',
      JSON.stringify({idConta,valor, dataTransacao: ''}))
      return res.json({data:conta, msgSent})
    } catch (error) {
      return res.json(`Não foi possível sacar valor. ${error}`)
    }
  }

  /**
   * put
   */
  public async bloquear(req: Request, res: Response) {
    try {
      const conta =  await bloquearConta(Number.parseInt(req.params?.id))
      if( conta === null)
        return res.send(`Conta já estava bloqueada.`)
      return res.send(conta)
    } catch (error) {
      return res.send(`Não foi possível bloquear a conta. Verifique
      se ela já não está bloqueada. ${error}`)
    }
  }


}

export default new ContasController()
