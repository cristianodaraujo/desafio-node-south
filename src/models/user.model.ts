import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import UserInterface from '@interfaces/user.interface';

const UserModel = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    role: {
        type: Schema.Types.String,
        enum: ['admin', 'client'],
        lowercase: true,
        default: 'client'
    }
});

UserModel.pre<UserInterface>('save', async function (next) {
    try {
        if (this.isNew) {
            const genSalt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, genSalt);
        }
        next();
    } catch (error) {
        next(error);
    }
});


UserModel.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
};

export default model<UserInterface>('user', UserModel);