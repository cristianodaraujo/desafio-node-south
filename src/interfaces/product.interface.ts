import { Document } from 'mongoose';

export default interface ProductInterface extends Document {
    _id: {
        type: string,
        required: boolean
    },
    name: {
        type: string,
        required: boolean
    },
    price: {
        type: number,
        required: boolean
    },
    quantity: {
        type: number,
        required: boolean
    }
}