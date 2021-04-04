import { Request, Response } from 'express'
import AppController from './AppController'

import  IConta  from "../models/IConta"

import { criarConta, obterSaldo, bloquearConta, obterTodas } from "../database/repositories/contaRepository";

class ContasController extends AppController {

  /**
   *  index 
   * return a account list
   */
  public async index( req: Request, res: Response) {
    return res.send(obterTodas())
  }

  /**
   *  index 
   * return a account list
   */
  public async saldo( req: Request, res: Response) {
    return res.send(obterSaldo(Number.parseInt(req.params.id)))
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
    // return criarConta(<IConta>req.body)
    return res.send(criarConta(<IConta>req.body))
  }

  /**
   * put
   */
  public async put() {
    
  }

  /**
   * delete
   */
  public async delete() {
    
  }


}

export default new ContasController()
