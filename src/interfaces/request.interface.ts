import { Request } from 'express';

export default interface RequestInterface extends Request {
    userId: {
        type: string,
        unique: boolean,
        required: boolean,
        lowercase: boolean
    },
    userRole: {
        type: string,
        lowercase: boolean,
        enum: ['admin', 'client']
    },
}