"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctor_controller_1 = __importDefault(require("../controllers/doctor.controller"));
const patient_controller_1 = require("../controllers/patient.controller");
const patient_tracker_controller_1 = require("../controllers/patient.tracker.controller");
const scheduleAppointmentController_1 = require("../controllers/scheduleAppointmentController");
const router = (0, express_1.Router)();
router.post('/get-doctors', doctor_controller_1.default);
router.post('/patient', patient_controller_1.createPatientController);
router.get('/patient', patient_controller_1.fetchPatientController);
router.get('/doctors', doctor_controller_1.default);
router.post('/patient-tracker', patient_tracker_controller_1.createPatientTrackerController);
router.get('/patient-tracker/:patientId', patient_tracker_controller_1.fetchPatientTrackerController);
router.get('/schedule-appointment', scheduleAppointmentController_1.scheduleAppointmentController);
exports.default = router;
