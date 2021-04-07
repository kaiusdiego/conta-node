import { Connection, Channel, connect, Message } from "amqplib";
import { config } from "dotenv"; 
config({path:__dirname+'/./../../../.env'});


export default class RabbitmqServer {

    private static conn: Connection
    private static channel: Channel = null
    private exchange: string;
    private queue: string;
    private rkey: string;

    constructor(private uri: string = process.env.RABBITMQ_URI) { 
    }

    public async init(): Promise<Channel> {
        if (RabbitmqServer.conn == null) {
            RabbitmqServer.conn = await connect(process.env.RABBITMQ_URI)
        }
        if (RabbitmqServer.channel == null) {
            return RabbitmqServer.channel = await RabbitmqServer.conn.createChannel()
        }
    }

    async declareExchange(exchange: string, type: string = 'direct') {
        RabbitmqServer.channel.assertExchange(exchange, type, { durable: true })
    }

    async declareQueue(queue: string): Promise<any> {
        return RabbitmqServer.channel.assertQueue(queue, {
            durable: true
        })
    }

    async bindQueueExchange(queue: string, exchange: string, rkey: string) {
        RabbitmqServer.channel.bindQueue(queue, exchange, rkey)
    }

    async publish(queue: string, msg: string) {
        return RabbitmqServer.channel.sendToQueue(queue, Buffer.from(msg))
    }

    async rKeyPublish(exchange: string, rkey: string, msg: string) {
        return RabbitmqServer.channel.publish(exchange, rkey, Buffer.from(msg))
    }

    async rKeyPublishQuick(msg: string) {
        return RabbitmqServer.channel.publish(this.queue, this.rkey, Buffer.from(msg))
    }

    async consume(queue: string, callback: (msg: Message) => void) {
        return RabbitmqServer.channel.consume(queue, (msg) => {
            callback(msg)
            RabbitmqServer.channel.ack(msg)
        })
    }

    async closeConnection() {
        return RabbitmqServer.conn.close()
    }

    async configureAndDeclare(exchange: string, queue: string, rkey: string): Promise<void> {
        this.exchange = exchange
        this.queue = queue
        this.rkey = rkey
        await this.declareExchange(exchange).then(
            await this.declareQueue.bind(null,queue)
        )
        await this.bindQueueExchange.bind(null,queue, exchange, rkey)
    }

    async getConnection(): Promise<Connection>{
        return RabbitmqServer.conn;
    }

}
