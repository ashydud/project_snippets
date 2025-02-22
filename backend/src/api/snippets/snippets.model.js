import { Schema, Types, model } from "mongoose";


const snippetsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: Schema.Types.ObjectId,
        ref: "statuses",
        required: true,
    },

    language: {
        type: Schema.Types.ObjectId,
        ref: "languages",
        required: true,
    },

    tag: {
        type: Schema.Types.ObjectId,
        ref: "tags",
        required: true,
    },
})