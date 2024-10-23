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
const Doctor_model_1 = require("../db/models/Doctor.model");
const fetchDoctorsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getDoctor = yield Doctor_model_1.Doctor.find().select({
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
    }
    catch (error) {
        next(new AppError_1.AppError('Unable to load health tips', 500));
    }
});
exports.default = fetchDoctorsController;
