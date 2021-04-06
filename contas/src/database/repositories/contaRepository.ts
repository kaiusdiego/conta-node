import { getRepository } from "typeorm";
import  Conta  from "../../entities/conta"
import  IConta  from "../../models/IConta"
import {Decimal} from 'decimal.js';


export const criarConta = async (payload: IConta): Promise<Conta | null> => {
  const contaRepository = getRepository(Conta)
  const conta = new Conta()
  return await contaRepository.save({
     ...conta,
     ...payload,
   })
}

export const obterConta = async (id: number): Promise<Conta | null> => {
  const contaRepository = getRepository(Conta)
  const conta = await contaRepository.findOne({ idConta: id })
  if (!conta) return null
  return conta
}

export const obterSaldo = async (id: number): Promise<Number | null> => {
  const contaRepository = getRepository(Conta)
  const conta = await contaRepository.findOneOrFail({ idConta: id })
  if (!conta) return null
  return conta.saldo
}

export const bloquearConta = async (id: number): Promise<Conta | null> => {
  const contaRepository = getRepository(Conta)
  let conta = await contaRepository.findOneOrFail({ idConta: id, flagAtivo: true})
  if (!conta) return null
  conta.flagAtivo = false
  return contaRepository.save(conta)
}

export const depositarValor = async (id: number, valor: number): Promise<Conta | null> => {
  const contaRepository = getRepository(Conta)
  let conta = await contaRepository.findOneOrFail({ idConta: id})
  if (!conta) return null
  conta.saldo = new Decimal(conta.saldo).plus(valor).toNumber()
  return contaRepository.save(conta)
}

export const sacarValor = async (id: number, valor: number): Promise<Conta | null> => {
  const contaRepository = getRepository(Conta)
  let conta = await contaRepository.findOneOrFail({ idConta: id})
  if (!conta) return null
  conta.saldo = new Decimal(conta.saldo).minus(valor).toNumber()
  return contaRepository.save(conta)
}

export const obterTodas = async (): Promise<any> => {
  const conta = getRepository(Conta)
  const all = await conta.find()
  return all
  
};

