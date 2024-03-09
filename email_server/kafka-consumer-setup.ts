import { Kafka } from 'kafkajs'

console.log('NEW>>>>', process.env.KAFKA_HOST || 'localhost:9092')

const kafka = new Kafka({
    clientId: 'orders_and_emails',
    brokers: [process.env.KAFKA_HOST || 'localhost:9092']
})

export default kafka;