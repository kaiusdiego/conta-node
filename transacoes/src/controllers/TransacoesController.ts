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
      const idConta = req.query.idConta
      const dtInicio = req.query.dtInicio
      const dtFim = req.query.dtFim
      console.log('inputs',idConta,dtInicio,dtFim);
      
      let transacoes
      if( dtInicio !== null && dtFim !== null){
        transacoes = await obterTransacoes(idConta,dtInicio,dtFim)
      } else {
        transacoes = await obterTransacoes(idConta)
      }
      if(transacoes.length == 0){
        throw new Error("Não existem movimentações nesta conta.");
      }
      return res.json(transacoes)
    } catch (error) {
      let result = {
        message: error.toString(),
        code: 404,
        error: "Não encontrada"
      }
      return res.status(404).json(result)
    }
  }

}

export default new TransacoesController()
