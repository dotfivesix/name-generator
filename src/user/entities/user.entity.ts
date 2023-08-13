import { Schema, model } from "mongoose";

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        length: 8
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    activationKey: {
        type: String,
        required: true,
        unique: true
    },
    activated: {
        type: Boolean,
        required: true,
        unique: false
    },
    favorites: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export const User = model('User', userSchema);