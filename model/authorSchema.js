import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Author Schema : id, password, 가입 일자로 구성.
const Author = new Schema({
    id: {
        type: String,
        required: true,
        uinque: true,
    },
    password: {
        type: String,
        required: true,
        uinque: true,
    },
    registed: {
        type: Date,
        default: Date.now,
    },
});

export const authorModel = model('Author', Author);
