import mongoose, { Document, Schema } from 'mongoose';

// Define the Tracker interface
export interface ITracker extends Document {
    patient: mongoose.Schema.Types.ObjectId; // Reference to a Patient
    timestamp: Date;
    notes?: string;
    symptoms?: string;
    diagnosis?: string,
    treatmentPlan?: string;
    nextappointment?: string
}

// Create the Tracker schema
const TrackerSchema: Schema<ITracker> = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    timestamp: { type: Date, default: Date.now },
    notes: { type: String },
    symptoms: { type: String },
    diagnosis: { type: String },
    treatmentPlan: { type: String },
    nextappointment: { type: String },
}, { timestamps: true });

// Create the Tracker model
const Tracker = mongoose.model<ITracker>('Tracker', TrackerSchema);

export default Tracker;
