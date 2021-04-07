import RabbitmqServer from "./RabbitmqServer"


export default class DepositoConsumer {
    
    constructor(){
        
    }

    public async consume (uri: string)  {
        const rabbit = new RabbitmqServer(uri)
    
        await rabbit.init()
        await rabbit.consume('deposito', (msg) =>{

        })
    }

}
