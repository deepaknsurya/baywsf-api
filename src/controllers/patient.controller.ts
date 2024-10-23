import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { User } from '../db/models/User.model';

export const createPatientController = async (req: Request, res: Response | any, next: NextFunction) => {
    try {
        const reqBody = req.body;
        const checkExist = await User.findOne({
            $or: [
                { email: reqBody.email },
                { phoneNumber: reqBody.phoneNumber }
            ]
        });

        if (checkExist)
            return res.status(200).json({
                status: false,
                message: "Already Patient Exist"
            });


        const getResponse = await User.create(reqBody);

        if (getResponse)
            return res.status(200).json({
                status: true,
                message: "Patient created succesfully"
            });

        return res.status(200).json({
            status: false,
            message: "Unable to create Patient"
        });
    } catch (error: any) {
        console.log(error.message)
        next(new AppError('Unable to create Patient', 500));
    }
};


export const fetchPatientController = async (req: Request, res: Response | any, next: NextFunction) => {
    try {

        const getPatient = await User.find({
            role: 'user'
        }).select({
            _id: 0,
            id: '$_id',
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            email: 1
        });

        if (getPatient) {
            return res.status(200).json({
                status: true,
                message: "Patient is loaded",
                data: getPatient
            });
        }

        return res.status(200).json({
            status: false,
            message: "Unable to load Patient"
        });
    } catch (error) {
        next(new AppError('Unable to load Patient', 500));
    }
};
