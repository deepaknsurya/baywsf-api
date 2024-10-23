import ScheduleAppointment from "../db/models/ScheduleAppointment.model";
import { AppError } from "../utils/AppError";
import { Request, Response, NextFunction } from 'express';

export const scheduleAppointmentController = async (req: Request, res: Response | any, next: NextFunction) => {
    try {
        const reqBody = req.body;

        const getExist = await ScheduleAppointment.findOne({
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

        const getResponse = await ScheduleAppointment.create(reqBody);
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
    } catch (error) {
        next(new AppError('Unable to load health tips', 500));
    }
};

