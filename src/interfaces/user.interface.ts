import { Document } from 'mongoose';

export default interface UserInterface extends Document {
    email: {
        type: string,
        unique: boolean,
        required: boolean,
        lowercase: boolean
    },
    password: {
        type: string,
        required: boolean
    },
    role: {
        type: string,
        lowercase: boolean,
        enum: ['admin', 'client']
    },
    isValidPassword(password: UserInterface["password"])
}