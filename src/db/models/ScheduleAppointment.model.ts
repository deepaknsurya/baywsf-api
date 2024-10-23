import mongoose, { Document, Schema } from 'mongoose';

// Define the Tracker interface
export interface IScheduleAppointment extends Document {
    patient: mongoose.Schema.Types.ObjectId; // Reference to a Patient
    doctor: mongoose.Schema.Types.ObjectId;
    notes?: string;
    symptoms?: string;
    appointment?: string,
    slot?: number
}

// Create the Tracker schema
const ScheduleAppointmentSchema: Schema<IScheduleAppointment> = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    notes: { type: String },
    symptoms: { type: String },
    appointment: { type: String },
    slot: { type: Number },
}, { timestamps: true });

// Create the Tracker model
const ScheduleAppointment = mongoose.model<IScheduleAppointment>('ScheduleAppointment', ScheduleAppointmentSchema);

export default ScheduleAppointment;
