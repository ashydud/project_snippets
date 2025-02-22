import { Schema, model } from "mongoose";


const usersSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    
    lastname: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    role: {
        type: Schema.Types.ObjectId,
        ref: "roles",
        required: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
        minlength: 6,
    }
}, {
    timestamps: true,
});

export const usersModel = model("users", usersSchema)