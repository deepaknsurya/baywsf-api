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
exports.fetchPatientController = exports.createPatientController = void 0;
const AppError_1 = require("../utils/AppError");
const User_model_1 = require("../db/models/User.model");
const createPatientController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqBody = req.body;
        const checkExist = yield User_model_1.User.findOne({
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
        const getResponse = yield User_model_1.User.create(reqBody);
        if (getResponse)
            return res.status(200).json({
                status: true,
                message: "Patient created succesfully"
            });
        return res.status(200).json({
            status: false,
            message: "Unable to create Patient"
        });
    }
    catch (error) {
        console.log(error.message);
        next(new AppError_1.AppError('Unable to create Patient', 500));
    }
});
exports.createPatientController = createPatientController;
const fetchPatientController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getPatient = yield User_model_1.User.find({
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
    }
    catch (error) {
        next(new AppError_1.AppError('Unable to load Patient', 500));
    }
});
exports.fetchPatientController = fetchPatientController;
