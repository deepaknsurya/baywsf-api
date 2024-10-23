import mongoose from 'mongoose';
import { seedDoctorDatabase } from './models/Doctor.model';

// PORT=3000
// MONGO_URI=mongodb+srv://deepaknsurya7:L74tIVV187lENDBf@cluster0abaywsf.op1pm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0abaywsf
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        seedDoctorDatabase();
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
