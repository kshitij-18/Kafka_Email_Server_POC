import express from 'express';
import kafka from './kafka-setup';
import orderRoutes from './routes/orderRoutes';
const app = express();

const PORT = 3000;

app.locals.kafkaInstance = kafka;

app.use(express.json());

app.use('/api/orders', orderRoutes)

app.listen(PORT, () => console.log(`Server Started and listening on PORT ${PORT}`));