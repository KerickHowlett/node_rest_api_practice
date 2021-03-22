import { Schema } from 'mongoose';

export const ContactSchema = new Schema( {
    firstName: {
        type: String,
        // required: 'Enter a first name.'
        required: true
    },
    lastName: {
        type: String,
        // required: 'Enter a last name.'
        required: true
    },
    email: { type: String },
    company: { type: String },
    phone: { type: Number },
    created_date: {
        type: Date,
        default: Date.now()
    }
} );