import { Kafka } from 'kafkajs'
import { without } from 'lodash';

const kafka = new Kafka({
    clientId: 'orders_and_emails',
    brokers: [process.env.KAFKA_HOST || 'localhost:9092']
})
const topics = ['order-created'];
const admin = kafka.admin();

const ensureAndReturnTopics = (currentTopics: string[], newTopics: string[]): string[] => {
    return without(newTopics, ...currentTopics);
}

const createTopics = async () => {
    const currentTopics = await admin.listTopics();
    const topicsToAdd = ensureAndReturnTopics(currentTopics, topics);
    await admin.createTopics({
        topics: topicsToAdd.map(topic => ({
            topic,
            numPartitions: 2,
            replicationFactor: 3
        })),
    });
    console.log('Created Topic email-test-topic with 2 partitions');
}

createTopics();

export default kafka;