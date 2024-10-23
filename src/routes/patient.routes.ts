import { Router } from 'express';
import healthTipController from '../controllers/healthTip.controller';

const router = Router();

router.get('/health-tips', healthTipController);

export default router;