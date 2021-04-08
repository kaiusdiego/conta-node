import { Between, getRepository } from "typeorm";
import  Transacao  from "../../entities/transacao"
import  ITransacao  from "../../models/ITransacao"
import {Decimal} from 'decimal.js';

export const depositarValor = async (payload: ITransacao): Promise<Transacao | null> => {
  const transacaoRepository = getRepository(Transacao)
  const transacao = new Transacao()
  payload.valor = new Decimal(payload.valor).toNumber()
  return await transacaoRepository.save({
     ...transacao,
     ...payload,
   })
}

export const sacarValor = async (payload: ITransacao): Promise<Transacao | null> => {
  const transacaoRepository = getRepository(Transacao)
  const transacao = new Transacao()
  payload.valor = new Decimal(payload.valor).toNumber()*(-1)
  return await transacaoRepository.save({
     ...transacao,
     ...payload,
   })
}

export const obterTransacoes = async (id: any, dtInicio?: any, dtFim?: any): 
Promise<Array<Transacao> | null> => {
  const transacaoRepository = getRepository(Transacao)
  if (dtInicio !== undefined && dtFim !== undefined) {
    return await transacaoRepository.find({idConta: id, dataTransacao: Between(dtInicio,dtFim)})
  }
  return await transacaoRepository.find({ idConta: id})
}
