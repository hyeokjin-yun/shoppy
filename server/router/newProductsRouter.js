import express from 'express';
import * as productContorller from '../controller/productsController.js';

const router = express.Router();

router.post('/', productContorller.insertProduct);

export default router;