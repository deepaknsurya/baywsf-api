import Tracker from "../db/models/Tracker.model";
import { AppError } from "../utils/AppError";
import { Request, Response, NextFunction } from 'express';

export const fetchPatientTrackerController = async (req: Request, res: Response | any, next: NextFunction) => {
    try {
        const { patientId } = req.params;

        const getTracker = await Tracker.find({
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
        })

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
    } catch (error) {
        next(new AppError('Unable to load health tips', 500));
    }
};

export const createPatientTrackerController = async (req: Request, res: Response | any, next: NextFunction) => {
    try {
        const reqBody = req.body;
        const getResponse = await Tracker.create(reqBody);

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
    } catch (error: any) {
        console.log(error.message)
        next(new AppError('Unable to load health tips', 500));
    }
};
