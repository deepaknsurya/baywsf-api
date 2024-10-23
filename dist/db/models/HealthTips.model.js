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
const mongoose_1 = require("mongoose");
// Create a Schema for Health Tips
const HealthTipSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    id: {
        type: Number
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});
// Create a HealthTip modeld
const HealthTip = (0, mongoose_1.model)('HealthTip', HealthTipSchema);
function insertHealthTips() {
    return __awaiter(this, void 0, void 0, function* () {
        // Sample health tips data
        const healthTips = [
            {
                title: 'Stay Hydrated',
                description: 'Drink at least 8 glasses of water daily.',
                id: 1
            },
            {
                title: 'Regular Exercise',
                description: 'Engage in at least 30 minutes of moderate exercise daily.',
                id: 2
            },
            {
                title: 'Balanced Diet',
                description: 'Eat a variety of foods including fruits and vegetables.',
                id: 3
            },
            {
                title: 'Adequate Sleep',
                description: 'Get 7-9 hours of quality sleep every night.',
                id: 4
            },
            {
                title: 'Mental Health',
                description: 'Take time to relax and manage stress through mindfulness.',
                id: 5
            },
            {
                title: 'Routine Checkups',
                description: 'Visit your doctor for annual checkups.',
                id: 6
            },
            {
                title: 'Stretching',
                description: 'Incorporate daily stretching exercises to improve flexibility.',
                id: 7
            },
            {
                title: 'Limit Sugar Intake',
                description: 'Reduce sugar consumption to maintain a healthy weight.',
                id: 8
            },
            {
                title: 'Quit Smoking',
                description: 'Avoid smoking to lower the risk of heart disease and lung cancer.',
                id: 9
            },
            {
                title: 'Stay Active',
                description: 'Keep moving throughout the day to prevent stiffness and fatigue.',
                id: 10
            }
        ];
        const getCount = yield HealthTip.countDocuments();
        if (getCount === 0)
            HealthTip.insertMany(healthTips);
    });
}
insertHealthTips();
exports.default = HealthTip;
