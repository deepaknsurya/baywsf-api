import { Router } from 'express';
import loginController from '../controllers/login.controller';
import patientRoutes from './patient.routes';
import providerRoutes from './provider.routes';
import { verifyToken } from '../utils/JwtUtil';

const router = Router();

router.post('/login', loginController);
router.use('/patient', verifyToken, patientRoutes);
router.use('/provider', verifyToken, providerRoutes);

export default router;