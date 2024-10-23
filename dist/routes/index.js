"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
const patient_routes_1 = __importDefault(require("./patient.routes"));
const provider_routes_1 = __importDefault(require("./provider.routes"));
const JwtUtil_1 = require("../utils/JwtUtil");
const router = (0, express_1.Router)();
router.post('/login', login_controller_1.default);
router.use('/patient', JwtUtil_1.verifyToken, patient_routes_1.default);
router.use('/provider', JwtUtil_1.verifyToken, provider_routes_1.default);
exports.default = router;
