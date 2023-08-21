import { Router } from 'express';
import userRouter from './user.js';

const router = Router();

router.use('/employee', userRouter);

export default router;