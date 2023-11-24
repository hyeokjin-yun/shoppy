import express from 'express';
import * as productContorller from '../controller/productsController.js';

const router = express.Router();

router.get('/', productContorller.showProducts);
router.get('/:id', productContorller.productDetail);

export default router;