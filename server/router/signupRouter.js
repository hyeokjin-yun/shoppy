import express from 'express';
import * as signupController from '../controller/signupController.js';

const router = express.Router();

router.post('/', signupController.signup);
router.get('/:id', signupController.getIdCheck);

export default router;