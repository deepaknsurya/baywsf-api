import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import HealthTip from '../db/models/HealthTips.model';

export const healthTipController = async (req: Request, res: Response | any, next: NextFunction) => {
    try {
        const randomNumber = Math.floor(Math.random() * 10) + 1;

        const getHealthTips = await HealthTip.findOne({
            id: randomNumber
        }).select({
            _id: 0,
            title: 1,
            description: 1
        });

        if (getHealthTips) {
            return res.status(200).json({
                status: true,
                message: "Health tips is loaded",
                data: getHealthTips
            });
        }

        return res.status(200).json({
            status: false,
            message: "Unable to load health tips"
        });
    } catch (error) {
        next(new AppError('Unable to load health tips', 500));
    }
};



export const fetchAllHealthTipController = async (req: Request, res: Response | any, next: NextFunction) => {
    try {
        const getHealthTips = await HealthTip.find().select({
            _id: 0,
            title: 1,
            description: 1
        });

        if (getHealthTips) {
            return res.status(200).json({
                status: true,
                message: "Health tips is loaded",
                data: getHealthTips
            });
        }

        return res.status(200).json({
            status: false,
            message: "Unable to load health tips"
        });
    } catch (error) {
        next(new AppError('Unable to load health tips', 500));
    }
};
