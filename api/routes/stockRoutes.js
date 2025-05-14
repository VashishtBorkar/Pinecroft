// api/routes/stocksRoutes.js
import express from 'express';
import { getStockQuote } from '../controllers/stockController.js';
const router = express.Router();

router.get('/:ticker', getStockQuote);

export default router;
