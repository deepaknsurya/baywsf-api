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
exports.scheduleAppointmentController = void 0;
const ScheduleAppointment_model_1 = __importDefault(require("../db/models/ScheduleAppointment.model"));
const AppError_1 = require("../utils/AppError");
const scheduleAppointmentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqBody = req.body;
        const getExist = yield ScheduleAppointment_model_1.default.findOne({
            doctor: reqBody.doctor,
            appointment: reqBody.appointment,
            slot: reqBody.slot,
        });
        if (getExist) {
            return res.status(200).json({
                status: false,
                message: "Doctor is not available to schedule appointment"
            });
        }
        const getResponse = yield ScheduleAppointment_model_1.default.create(reqBody);
        if (getResponse) {
            return res.status(200).json({
                status: true,
                message: "Appointment scheduled successfully "
            });
        }
        return res.status(200).json({
            status: false,
            message: "Unable to create schedule appointment"
        });
    }
    catch (error) {
        next(new AppError_1.AppError('Unable to load health tips', 500));
    }
});
exports.scheduleAppointmentController = scheduleAppointmentController;
