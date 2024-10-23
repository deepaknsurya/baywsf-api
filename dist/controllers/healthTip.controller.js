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
const AppError_1 = require("../utils/AppError");
const HealthTips_model_1 = __importDefault(require("../db/models/HealthTips.model"));
const healthTipController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        const getHealthTips = yield HealthTips_model_1.default.findOne({
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
    }
    catch (error) {
        next(new AppError_1.AppError('Unable to load health tips', 500));
    }
});
exports.default = healthTipController;
