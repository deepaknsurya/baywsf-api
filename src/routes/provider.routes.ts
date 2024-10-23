import { Router } from 'express';
import fetchDoctorsController from '../controllers/doctor.controller';
import { createPatientController, fetchPatientController } from '../controllers/patient.controller';

const router = Router();

router.post('/get-doctors', fetchDoctorsController);
router.post('/patient', createPatientController);
router.get('/patient', fetchPatientController);
router.get('/doctors', fetchDoctorsController);

export default router;