import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    role: string;
    lastName: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password || 'User@123', salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return candidatePassword !== null && this.password !== null && bcrypt.compare(candidatePassword, this.password);
};

// Admin Model
const User = mongoose.model<IUser>('User', UserSchema);

// Sample Admin Data
const UserSampleData = [
    {
        email: "admin@baywsf.com",
        password: "admin@123", // Will be hashed by the pre-save hook
        firstName: "Sarah",
        lastName: "Moderator",
        role: "admin",
        phoneNumber: "+1-555-0128",
    }
];

// Function to seed admin data
async function seedAdminData() {
    try {
        const getCount = await User.countDocuments({ email: "admin@baywsf.com" });
        if (getCount === 0) {
            await User.create(UserSampleData);
            console.log('Admin User Created Successfully');
        }
    } catch (error) {
        console.error('Error seeding admin data:', error);
    }
}

seedAdminData();

export { User, seedAdminData, IUser };