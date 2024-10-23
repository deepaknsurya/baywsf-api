import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { Doctor } from '../db/models/Doctor.model';

const fetchDoctorsController = async (req: Request, res: Response | any, next: NextFunction) => {
    try {
        const getDoctor = await Doctor.find().select({
            id: '$_id',
            name: 1,
            specialization: 1
        });

        if (getDoctor) {
            return res.status(200).json({
                status: true,
                message: "Doctor is loaded",
                data: getDoctor
            });
        }

        return res.status(200).json({
            status: false,
            message: "Unable to load doctors"
        });
    } catch (error) {
        next(new AppError('Unable to load health tips', 500));
    }
};

export default fetchDoctorsController;