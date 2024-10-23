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
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../utils/AppError");
const User_model_1 = require("../db/models/User.model");
const JwtUtil_1 = require("../utils/JwtUtil");
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqBody = req.body;
        const getUser = yield User_model_1.User.findOne({ email: reqBody.email }).select({
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            role: 1,
            email: 1,
            password: 1
        });
        if (getUser) {
            const isMatch = yield getUser.comparePassword(reqBody.password);
            if (isMatch) {
                if (getUser.role === reqBody.role) {
                    const getToken = (0, JwtUtil_1.generateKey)({
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
    }
    catch (error) {
        next(new AppError_1.AppError('Unable to fetch users', 500));
    }
});
exports.default = loginController;
