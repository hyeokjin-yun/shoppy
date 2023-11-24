import express from 'express';
import * as cartController from '../controller/cartController.js';

const router = express.Router();

router.post('/', cartController.insertCart);

export default router;