import mongoose, { Document, Schema } from 'mongoose';

interface IDoctor extends Document {
    name: string;
    email: string;
    specialization: string;
    yearsOfExperience: number;
    phone: string;
    createdAt: Date;
}

const DoctorSchema = new Schema<IDoctor>({
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

const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema);

async function seedDoctorDatabase() {
    try {
        await Doctor.deleteMany({});
        await Doctor.insertMany(doctorsSampleData);
        console.log('Doctor Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

export { Doctor, IDoctor, seedDoctorDatabase };
