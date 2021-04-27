import ITransacao from "@models/ITransacao"
import Decimal from "decimal.js"
import { depositarValor, obterSaques, obterTransacoes, sacarValor } from "./database/repositories/transacaoRepository"
import RabbitmqServer from "./RabbitmqServer"

export default class Consumer {
    
    public async consume (uri: string)  {
        const rabbit = new RabbitmqServer(uri)
    
        await rabbit.init()
        await rabbit.consume('deposito', async (msg) =>{
            const deposito = <ITransacao>JSON.parse(msg.content.toString())
            const res = await depositarValor(deposito)
        })
        await rabbit.consume('saque', async (msg) =>{
            const saque = <ITransacao>JSON.parse(msg.content.toString())
            const res = await sacarValor(saque)
        })
        await rabbit.consume('limitediario', async (msg) =>{
            const conta = JSON.parse(msg.content.toString())
            
            let dtAux = new Date(conta.dataTransacao)
            dtAux.setDate(dtAux.getDate() + 1)
            let dtInicial = new Date(conta.dataTransacao).toISOString().split('T')[0]
            let dtFinal = new Date(dtAux).toISOString().split('T')[0]

            const res =  await obterSaques(conta.idConta,dtInicial,dtFinal)
            let transacoes = Object.assign({}, res)

            let saqueDiario =  Object.keys(transacoes).reduce(function (ob, k) {
                if(transacoes[k].valor < 0){
                    ob.valor += new Decimal(transacoes[k].valor).toNumber()
                }
                return ob
            }, { valor: 0 })

            let saqueLiberado = true

            if(saqueDiario.valor != 0 && res.length !=0 ){
                let saqueTotal = new Decimal(saqueDiario.valor).abs().plus(conta.valor).abs().toNumber()
                
                if( saqueTotal > new Decimal(conta.limite).toNumber()){
                    saqueLiberado = false
                    console.log('saque bloqueado por limite de :',conta.limite)
                }
            }

            await rabbit.declareExchange('contas')
            await rabbit.declareQueue('saqueliberado')
            await rabbit.bindQueueExchange('saqueliberado','contas','saqueliberado.transacao')
            await rabbit.rKeyPublish('contas','saqueliberado.transacao',
            JSON.stringify({saqueLiberado , data: new Date() }))
        })
    }
}
