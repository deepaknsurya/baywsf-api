import { Router } from 'express';
import fetchDoctorsController from '../controllers/doctor.controller';
import { createPatientController, fetchPatientController } from '../controllers/patient.controller';
import { createPatientTrackerController, fetchPatientTrackerController } from '../controllers/patient.tracker.controller';
import { scheduleAppointmentController } from '../controllers/scheduleAppointmentController';

const router = Router();

router.post('/get-doctors', fetchDoctorsController);
router.post('/patient', createPatientController);
router.get('/patient', fetchPatientController);
router.get('/doctors', fetchDoctorsController);

router.post('/patient-tracker', createPatientTrackerController);
router.get('/patient-tracker/:patientId', fetchPatientTrackerController);

router.get('/schedule-appointment', scheduleAppointmentController);
export default router;