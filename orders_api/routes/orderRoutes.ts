import express from 'express';
import orderService from '../order_api_router/order_api_router'
const router = express.Router();

// Create an Order;
router.post('', orderService.create);

export default router;