import { Router } from 'express';
import { fetchAllHealthTipController, healthTipController } from '../controllers/healthTip.controller';

const router = Router();

router.get('/health-tips', healthTipController);
router.get('/health-tips-all', fetchAllHealthTipController);

export default router;