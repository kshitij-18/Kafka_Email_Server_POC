import { Kafka } from "kafkajs";
import { Request, Response } from 'express';
import sendMessage from "../create-message";

class OrderService {
    async create(req: Request, res: Response) {
        const data = req.body;
        console.log('REQUEST', req.body);
        const kafka: Kafka = req.app.locals.kafkaInstance;
        console.log('Confirming your order');
        console.log('Confirming Payment');
        console.log('Sending message');
        await sendMessage(kafka, JSON.stringify(data), 'order-created');
        res.status(201).json({
            message: 'Order Created'
        })
    }
}

export default new OrderService();