import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { User } from '../db/models/User.model';
import { generateKey } from '../utils/JwtUtil';

const loginController = async (req: Request, res: any, next: NextFunction) => {
    try {
        const reqBody = req.body;

        const getUser = await User.findOne({ email: reqBody.email }).select({
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            role: 1,
            email: 1,
            password: 1

        });

        if (getUser) {
            const isMatch = await getUser.comparePassword(reqBody.password);
            if (isMatch) {
                if (getUser.role === reqBody.role) {
                    const getToken = generateKey({
                        id: getUser._id,
                        firstName: getUser.firstName,
                        lastName: getUser.lastName,
                        phoneNumber: getUser.phoneNumber,
                        role: getUser.role,
                        email: getUser.email,
                    });

                    return res.status(200).json({
                        status: true,
                        message: "Login is Successfully",
                        token: getToken,
                        data: {
                            firstName: getUser.firstName,
                            lastName: getUser.lastName,
                            phoneNumber: getUser.phoneNumber,
                            role: getUser.role,
                            email: getUser.email,
                        }
                    });
                }
                return res.status(200).json({
                    status: false,
                    message: "Restricted Access for Login"
                });
            }
        }

        return res.status(200).json({
            status: false,
            message: "Unable to Login Successfully"
        });
    } catch (error) {
        next(new AppError('Unable to fetch users', 500));
    }
};

export default loginController;