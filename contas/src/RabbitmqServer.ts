import { Connection, Channel, connect, Message } from "amqplib";

export default class RabbitmqServer {

    private static conn: Connection = null
    private static channel: Channel = null

    constructor(private uri: string) { }

    async init(): Promise<void> {
        if (RabbitmqServer.conn == null) {
            RabbitmqServer.conn = await connect(this.uri)
        }
        if (RabbitmqServer.channel == null) {
            RabbitmqServer.channel = await RabbitmqServer.conn.createChannel()
        }
    }

    async declareExchange(exchange: string, type: string = 'direct') {
        RabbitmqServer.channel.assertExchange(exchange, type, { durable: true })
    }

    async declareQueue(queue: string) {
        RabbitmqServer.channel.assertQueue(queue, {
            durable: true
        })
    }

    async bindQueueExchange(queue: string, exchange: string, rkey: string) {
        RabbitmqServer.channel.bindQueue(queue, exchange, rkey)
    }

    async publish(queue: string, msg: string) {
        return RabbitmqServer.channel.sendToQueue(queue, Buffer.from(msg))
    }

    async rKeyPublish(queue: string, rkey: string, msg: string) {
        return RabbitmqServer.channel.publish(queue, rkey, Buffer.from(msg))
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

}
