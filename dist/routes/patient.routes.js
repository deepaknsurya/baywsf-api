"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthTip_controller_1 = __importDefault(require("../controllers/healthTip.controller"));
const router = (0, express_1.Router)();
router.get('/health-tips', healthTip_controller_1.default);
exports.default = router;
