"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatientTrackerController = exports.fetchPatientTrackerController = void 0;
const Tracker_model_1 = __importDefault(require("../db/models/Tracker.model"));
const AppError_1 = require("../utils/AppError");
const fetchPatientTrackerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientId } = req.params;
        const getTracker = yield Tracker_model_1.default.find({
            patient: patientId
        }).select({
            _id: 0,
            id: '$_id',
            notes: 1,
            symptoms: 1,
            diagnosis: 1,
            treatmentPlan: 1,
            nextappointment: 1
        }).sort({
            createdAt: -1
        });
        if (getTracker) {
            return res.status(200).json({
                status: true,
                message: "patient tracker is loaded",
                data: getTracker
            });
        }
        return res.status(200).json({
            status: false,
            message: "Unable to load patient tracker"
        });
    }
    catch (error) {
        next(new AppError_1.AppError('Unable to load health tips', 500));
    }
});
exports.fetchPatientTrackerController = fetchPatientTrackerController;
const createPatientTrackerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqBody = req.body;
        const getResponse = yield Tracker_model_1.default.create(reqBody);
        if (getResponse)
            return res.status(200).json({
                status: true,
                message: "Patient Tracker created succesfully"
            });
        // Tracker.find()
        return res.status(200).json({
            status: false,
            message: "Unable to create patient tracker"
        });
    }
    catch (error) {
        console.log(error.message);
        next(new AppError_1.AppError('Unable to load health tips', 500));
    }
});
exports.createPatientTrackerController = createPatientTrackerController;
