import mongoose, { Document, ObjectId, Schema } from 'mongoose';

interface IAppontment extends Document {
    doctorId: ObjectId;
    date: Date;
    slot: Number;
    reason: string;
    description: string;
    createdAt: Date;
}

const AppontmentSchema = new Schema<IAppontment>({
    doctorId: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true, unique: true },
    slot: { type: Number, required: true },
    reason: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Appontment = mongoose.model<IAppontment>('Appontment', AppontmentSchema);

async function seedAppontmentDatabase() {
    try {
        await Appontment.deleteMany({});
        console.log('Appontment Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

export { Appontment, seedAppontmentDatabase };
