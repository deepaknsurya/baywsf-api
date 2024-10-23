"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Doctor = void 0;
exports.seedDoctorDatabase = seedDoctorDatabase;
const mongoose_1 = __importStar(require("mongoose"));
const DoctorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    specialization: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const doctorsSampleData = [
    {
        name: "Dr. John Smith",
        email: "john.smith@hospital.com",
        specialization: "General Medicine",
        yearsOfExperience: 8,
        phone: "+1-555-0123",
    },
    {
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@hospital.com",
        specialization: "Pediatrics",
        yearsOfExperience: 12,
        phone: "+1-555-0124",
    }
];
const Doctor = mongoose_1.default.model('Doctor', DoctorSchema);
exports.Doctor = Doctor;
function seedDoctorDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Doctor.deleteMany({});
            yield Doctor.insertMany(doctorsSampleData);
            console.log('Doctor Database seeded successfully');
        }
        catch (error) {
            console.error('Error seeding database:', error);
        }
    });
}
