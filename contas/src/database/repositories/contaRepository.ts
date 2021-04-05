import { getRepository } from "typeorm";
import  Conta  from "../../entities/conta";
import  IConta  from "../../models/IConta"

export const criarConta = async (payload: IConta): Promise<Conta> => {
  const contaRepository = getRepository(Conta);
  const conta = new Conta();
  return await contaRepository.save({
    ...conta,
    ...payload,
  });
};

export const obterConta = async (id: number): Promise<Conta | null> => {
  const contaRepository = getRepository(Conta);
  const conta = await contaRepository.findOne({ idConta: id });
  if (!conta) return null;
  return conta;
};

export const obterSaldo = async (id: number): Promise<Conta | null> => {
  const contaRepository = getRepository(Conta);
  const conta = await contaRepository.findOne({ idConta: id });
  if (!conta) return null;
  return conta;
};

export const bloquearConta = async (id: number): Promise<Conta | null> => {
  const contaRepository = getRepository(Conta);
  const conta = await contaRepository.findOne({ idConta: id });
  if (!conta) return null;
  conta.flagAtivo = false;
  return contaRepository.save(conta);
};

export const obterTodas = async (): Promise<any> => {
  const conta = getRepository(Conta);
  const all = await conta.find();
  // console.log(all);
  return all
  
};

