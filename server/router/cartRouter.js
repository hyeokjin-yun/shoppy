import express from 'express';
import * as cartController from '../controller/cartController.js';

const router = express.Router();

// router.get('/:id', cartController.getCart);
router.get('/:id/:startIndex/:endIndex', cartController.getPageList);
router.get('/:id/:cid', cartController.removeCart);
router.get('/:id/:cid/:checkFlag', cartController.updateQty);

export default router;