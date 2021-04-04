import RabbitmqServer from "src/RabbitmqServer"

export default class AppController{

  public rabbit: RabbitmqServer
  
  constructor(rabbit?: RabbitmqServer){
    this.rabbit = new RabbitmqServer(process.env.RABBIT_URI)
  }

  async init() {
    await this.rabbit.init()
  }
  

}
