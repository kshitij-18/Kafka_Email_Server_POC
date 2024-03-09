import { Kafka } from "kafkajs";


const sendMessage = async (kafkaInstance: Kafka, message: string, topic: string): Promise<void> => {
    const producer = kafkaInstance.producer();
    await producer.connect();
    await producer.send({
        messages: [
            { value: message,  }
        ],
        topic
    });
    await producer.disconnect();
}

export default sendMessage;