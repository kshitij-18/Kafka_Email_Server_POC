import express from 'express';
import kafka from './kafka-consumer-setup';
import main from './listeners';
const app = express();

const consumer = kafka.consumer({
    groupId: 'test-group',
});

async function listenToMessages() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'order-created', fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ message }) => {
            main({ value: message });
        }
    })
}

listenToMessages();

const PORT = 3001;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));