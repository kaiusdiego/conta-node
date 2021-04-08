import ITransacao from "@models/ITransacao"
import { depositarValor, sacarValor } from "./database/repositories/transacaoRepository"
import RabbitmqServer from "./RabbitmqServer"

export default class Consumer {
    
    public async consume (uri: string)  {
        const rabbit = new RabbitmqServer(uri)
    
        await rabbit.init()
        await rabbit.consume('deposito', async (msg) =>{
            const deposito = <ITransacao>JSON.parse(msg.content.toString())
            const res = await depositarValor(deposito)
            console.log('Depósito realizado:',res);
        })
        await rabbit.consume('saque', async (msg) =>{
            const saque = <ITransacao>JSON.parse(msg.content.toString())
            const res = await sacarValor(saque)
            console.log('Saque realizado:',res);
        })
    }
}
