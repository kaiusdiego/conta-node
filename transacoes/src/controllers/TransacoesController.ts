import { Request, Response } from 'express'
import { obterTransacoes } from 'src/database/repositories/transacaoRepository'

class TransacoesController {

  /**
   * 
   * @param req 
   * @param res 
   * @returns 
   */
  public async index( req: Request, res: Response) {
    try {
      const idConta = req.query.idconta
      const dtInicio = req.query.dtinicio
      const dtFim = req.query.dtfim
      console.log('inputs',idConta,dtInicio,dtFim);
      
      let transacoes
      if( dtInicio !== null && dtFim !== null){
        transacoes = await obterTransacoes(idConta,dtInicio,dtFim)
      } else {
        transacoes = await obterTransacoes(idConta)
      }
      return res.json(transacoes)
    } catch (error) {
      return res.json(`Não foi possível obter transações da conta. ${error}`)
    }
  }

}

export default new TransacoesController()
